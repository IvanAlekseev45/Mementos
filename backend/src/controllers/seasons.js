import createHttpError from 'http-errors';
import Season from '../db/models/Seasons.js';
import Memory from '../db/models/Memory.js';

export const getAllSeasons = async (req, res) => {
  const seasons = await Season.find();
  res.json(seasons);
};

export const getSeasonById = async (req, res) => {
  const { id } = req.params;
  const season = await Season.findOne({ _id: id });
  if (!season) throw createHttpError(404, 'Season not found');

  res.json(season);
};

export const createSeason = async (req, res) => {
  const newSeason = await Season.create(req.body);
  res.json(newSeason);
};

export const patchSeason = async (req, res) => {
  const { id } = req.params;
  const updatedSeason = await Season.findOneAndUpdate({ _id: id }, req.body, {
    returnDocument: 'after',
  });

  if (!updatedSeason) throw createHttpError(404, 'Season not found');

  res.json(updatedSeason);
};

export const deleteSeason = async (req, res) => {
  const { id } = req.params;
  const memory = await Memory.exists({ season: id });
  if (memory)
    throw createHttpError(409, 'Cannot delete season because it used');

  await Season.findOneAndDelete({ _id: id });

  res.status(204).send();
};
