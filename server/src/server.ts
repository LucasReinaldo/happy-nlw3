import './database/connection';
import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import path from 'path';
import cors from 'cors';

import errorHandler from './errors/handler';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(3001, () => {
  console.log('💻 Running on port 3001');
});
