/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.middleware';
import expressWinston from 'express-winston';
import winston from 'winston';
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));

app.get('/', (_req, _res, next) => {
  try {
    throw new Error('Something went wrong');
  } catch (e) {
    next(e);
  }
});

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.File({ filename: 'logs/error.log' })],
    format: winston.format.combine(winston.format.json()),
  }),
);

app.use(errorHandler);

export default app;
