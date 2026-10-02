import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDatabase } from './db/connectDatabase.js';
import dns from 'node:dns';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorsHandler } from './middlewares/errorsHandler.js';
import routerMemories from './routes/memoriesRouter.js';
import routerSeasons from './routes/seasonsRouter.js';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import { errors } from 'celebrate';

const { PORT } = process.env;
const port = PORT ?? 3000;

const app = express();
app.use(express.json());
app.use(logger);
app.use(cors());

app.use('/memories', routerMemories);
app.use('/seasons', routerSeasons);
app.use(notFoundHandler);

app.use(errors());
app.use(errorsHandler);

await connectDatabase();

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});
