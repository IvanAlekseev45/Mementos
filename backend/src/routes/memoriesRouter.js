import { Router } from 'express';
import {
  createMemory,
  deleteMemoryById,
  getAllMemories,
  getMemoryById,
  updateMemory,
} from '../controllers/memories.js';
import { celebrate } from 'celebrate';
import {
  createMemorySchema,
  getMemoriesQueryParamsSchema,
  memoryIdSchema,
  updateMemorySchema,
} from '../validations/memoriesValidation.js';

const routerMemories = Router();

routerMemories.get(
  '/',
  celebrate(getMemoriesQueryParamsSchema),
  getAllMemories,
);

routerMemories.get(`/:id`, celebrate(memoryIdSchema), getMemoryById);

routerMemories.post(
  '/',
  celebrate(createMemorySchema, { abortEarly: false }),
  createMemory,
);

routerMemories.patch(
  `/:id`,
  celebrate(updateMemorySchema, { abortEarly: false }),
  updateMemory,
);

routerMemories.delete(`/:id`, celebrate(memoryIdSchema), deleteMemoryById);

export default routerMemories;
