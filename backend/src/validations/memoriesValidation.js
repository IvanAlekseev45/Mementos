import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('invalid id format');
};

const sortByValues = ['date', 'createdAt'];
const seasons = ['spring', 'summer', 'autumn', 'winter'];

export const getMemoriesQueryParamsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).default(6),
    query: Joi.string().allow(''),
    sortBy: Joi.string()
      .valid(...sortByValues)
      .default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
    seasonsCategory: Joi.string()
      .valid(...seasons)
      .allow(''),
  }),
};

export const createMemorySchema = {
  [Segments.BODY]: Joi.object({
    image: Joi.string().required().trim().uri(),
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    location: Joi.string().required().trim(),
    date: Joi.string().required().trim().isoDate(),
  }),
};

export const updateMemorySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim(),
    description: Joi.string().trim(),
    location: Joi.string().trim(),
    date: Joi.string().trim().isoDate(),
  }).min(1),

  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const memoryIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};
