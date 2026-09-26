import Memory from '../db/models/Memory.js';

export const getAllMemories = async (req, res) => {
  const { query } = req.query;

  const myMemories = Memory.find().sort({
    createdAt: -1,
  });

  if (query !== undefined) {
    myMemories.where({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { date: { $regex: query, $options: 'i' } },
      ],
    });
  }

  const result = await myMemories;

  res.json(result);
};

export const createMemory = async (req, res) => {
  const body = req.body;
  await Memory.create(body);
  res.status(201).send();
};

export const deleteMemoryById = async (req, res) => {
  const { id } = req.params;

  await Memory.findOneAndDelete({ _id: id });
  res.status(204).send();
};
