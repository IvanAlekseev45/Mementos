import Memory from '../db/models/Memory.js';
import createHttpError from 'http-errors';
import { addSeasonFromMonth } from '../utils/month.js';
import Season from '../db/models/Seasons.js';

export const getAllMemories = async (req, res) => {
  const { page, perPage, sortBy, sortOrder, query, seasonsCategory } =
    req.query;

  const skip = (page - 1) * perPage;

  const season = await Season.findOne({ season: seasonsCategory });

  const memoryQuery = Memory.find();

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

  if (seasonsCategory) {
    memoryQuery.where('season').equals(season._id);
  }

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

  const [myMemories, filterItems, totalItems] = await Promise.all([
    memoryQuery
      .populate('season')
      .sort({
        [sortBy]: sortOrder,
      })
      .limit(perPage)
      .skip(skip),

    memoryQuery.clone().countDocuments(),

    Memory.find().clone().countDocuments(),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

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

  if (!memory) throw createHttpError(404, `Cannot find memory with id ${id}`);

  await memory.populate('season');
  res.json(memory);
};
export const createMemory = async (req, res) => {
  const body = req.body;
  const date = req.body.date;

  await addSeasonFromMonth(body, date);

  const newCard = await Memory.create(body);
  await newCard.populate('season');
  res.status(201).json({
    newCard,
  });
};

export const updateMemory = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const date = req.body.date;

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
