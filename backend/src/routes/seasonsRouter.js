import { Router } from 'express';
import {
  createSeason,
  deleteSeason,
  getAllSeasons,
  getSeasonById,
  patchSeason,
} from '../controllers/seasons.js';

const routerSeasons = Router();

routerSeasons.get('/', getAllSeasons);

routerSeasons.get('/:id', getSeasonById);

routerSeasons.post('/', createSeason);

routerSeasons.patch('/:id', patchSeason);

routerSeasons.delete('/:id', deleteSeason);

export default routerSeasons;
