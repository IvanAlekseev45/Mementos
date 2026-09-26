import { Router } from 'express';
import {
  createMemory,
  deleteMemoryById,
  getAllMemories,
} from '../controllers/memories.js';

const routerMemories = Router();

routerMemories.get('/', getAllMemories);

routerMemories.post('/', createMemory);

routerMemories.delete(`/:id`, deleteMemoryById);

export default routerMemories;
