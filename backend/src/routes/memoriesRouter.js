import { Router } from 'express';
import { createMemory, getAllMemories } from '../controllers/memories.js';

const routerMemories = Router();

routerMemories.get('/', getAllMemories);

routerMemories.post('/', createMemory);

export default routerMemories;
