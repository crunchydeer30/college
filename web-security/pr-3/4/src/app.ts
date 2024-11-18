/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.middleware';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'script-src': ["'self'", 'https://example.com'],
      'style-src': ["'self'", 'https://example.com'],
      'img-src': ["'self'", 'https://example.com'],
      'default-src': ["'self'", 'https://example.com'],
    },
  }),
);

app.use((_req, res, next) => {
  console.log(res.getHeaders());
  next();
});

app.get('/', (_req, res) => {
  res.send('OK');
});

app.use(errorHandler);

export default app;
