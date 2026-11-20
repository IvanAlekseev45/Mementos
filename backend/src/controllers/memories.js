import Memory from '../db/models/Memory.js';
import createHttpError from 'http-errors';
import { addSeasonFromMonth } from '../utils/month.js';
import Season from '../db/models/Seasons.js';
import { saveBufferToCloudery } from '../utils/cloudinary.js';

export const getAllMemories = async (req, res) => {
  const { page, perPage, sortBy, sortOrder, query, seasonsCategory } =
    req.query;

  const skip = (page - 1) * perPage;

  // Створюємо базовий запит
  const memoryQuery = Memory.find();

  // Знаходимо сезон лише тоді, коли він переданий
  if (seasonsCategory) {
    const season = await Season.findOne({
      season: seasonsCategory,
    });

    if (!season) {
      throw createHttpError(404, 'Season not found');
    }

    memoryQuery.where('season').equals(season._id);
  }

  // Додаємо пошук
  if (query) {
    memoryQuery.where({
      $or: [
        {
          title: {
            $regex: query,
            $options: 'i',
          },
        },
        {
          description: {
            $regex: query,
            $options: 'i',
          },
        },
        {
          location: {
            $regex: query,
            $options: 'i',
          },
        },
      ],
    });
  }

  // Статистика кількості memories за сезонами
  const seasonCounts = await Memory.aggregate([
    {
      $group: {
        _id: '$season',
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'seasons',
        localField: '_id',
        foreignField: '_id',
        as: 'seasonInfo',
      },
    },
    {
      $unwind: '$seasonInfo',
    },
    {
      $project: {
        _id: 0,
        season: '$seasonInfo.season',
        count: 1,
      },
    },
  ]);

  // Незалежні запити до бази даних
  const [myMemories, filterItems, totalItems] = await Promise.all([
    // Отримуємо тільки одну сторінку
    memoryQuery
      .clone()
      .populate('season')
      .sort({
        [sortBy]: sortOrder,
      })
      .limit(perPage)
      .skip(skip),

    // Рахуємо всі записи після фільтрації
    memoryQuery.clone().countDocuments(),

    // Рахуємо всі записи в базі
    Memory.countDocuments(),
  ]);

  // Кількість сторінок після фільтрації
  const totalPages = Math.ceil(filterItems / perPage);

  res.json({
    page,
    totalPages,
    totalItems,
    filterItems,
    perPage,
    seasonCounts,
    memories: myMemories,
  });
};

export const getMemoryById = async (req, res) => {
  const { id } = req.params;

  const memory = await Memory.findOne({ _id: id });

  if (!memory) {
    throw createHttpError(404, `Cannot find memory with id ${id}`);
  }

  await memory.populate('season');

  res.json(memory);
};

export const createMemory = async (req, res) => {
  const file = req.file;

  if (!file) {
    throw createHttpError(400, 'Photo is required');
  }

  const uploadedFile = await saveBufferToCloudery({
    buffer: file.buffer,
    folder: 'mementos',
  });

  const body = req.body;
  const date = body.date;

  await addSeasonFromMonth(body, date);

  body.image = uploadedFile.secure_url;

  const newCard = await Memory.create(body);

  await newCard.populate('season');

  res.status(201).json({
    newCard,
  });
};

export const updateMemory = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const date = body.date;

  if (date) {
    await addSeasonFromMonth(body, date);
  }

  const updatedMemory = await Memory.findOneAndUpdate({ _id: id }, body, {
    returnDocument: 'after',
  });

  if (!updatedMemory) {
    throw createHttpError(404, `Cannot find memory with id ${id}`);
  }

  res.json({
    updatedMemory,
  });
};

export const deleteMemoryById = async (req, res) => {
  const { id } = req.params;

  await Memory.findOneAndDelete({ _id: id });

  res.status(204).send();
};
