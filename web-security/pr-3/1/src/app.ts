/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { validate } from './middleware/validate.middleware';

import errorHandler from './middleware/errorHandler.middleware';
import { CreateRecordSchema } from './schemas/record.schema';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import env from './config/env';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));

const db = new PrismaClient();

app.post('/', validate(CreateRecordSchema), async (req, res, next) => {
  try {
    const { content } = req.body;

    const key = crypto
      .createHash('sha512')
      .update(env.SECRET_KEY)
      .digest('hex')
      .substring(0, 32);
    const encryptionIV = crypto
      .createHash('sha512')
      .update(env.SECRET_IV)
      .digest('hex')
      .substring(0, 16);

    const cipher = crypto.createCipheriv('aes-256-gcm', key, encryptionIV);

    const encryptedData = Buffer.from(
      cipher.update(content, 'utf8', 'hex') + cipher.final('hex'),
    ).toString('base64');

    const record = await db.record.create({
      data: {
        content: encryptedData,
      },
    });

    return res.status(201).json(record);
  } catch (err) {
    return next(err);
  }
});

app.use(errorHandler);

export default app;
