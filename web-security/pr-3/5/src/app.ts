/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));

app.use((_req, res, next) => {
  res.cookie('session_id', '1234567890', {
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
  });
  next();
});

app.get('/', (_req, res) => {
  res.send('OK');
});

app.use(errorHandler);

export default app;
