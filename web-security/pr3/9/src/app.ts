/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.middleware';
import sanitize from 'sanitize-html';
import { validate } from './middleware/validate.middleware';
import { SendDataSchema } from './schema/send-data.schema';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));

app.post('/', validate(SendDataSchema), (req, res, next) => {
  try {
    const { html } = req.body;
    const sanitizedHtml = sanitize(html);
    res.status(201).json({
      message: 'HTML sanitized successfully',
      sanitizedHtml,
    });
  } catch (e) {
    next(e);
  }
});

app.use(errorHandler);

export default app;
