import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDatabase } from './db/connectDatabase.js';
import dns from 'node:dns';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorsHandler } from './middlewares/errorsHandler.js';
import routerMemories from './routes/memoriesRouter.js';
dns.setServers(['8.8.8.8', '8.8.4.4']);

const { PORT } = process.env;
const port = PORT ?? 3000;

const app = express();
app.use(express.json());
app.use(logger);
app.use(cors());

app.use('/', routerMemories);

app.use(notFoundHandler);
app.use(errorsHandler);

await connectDatabase();

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});
