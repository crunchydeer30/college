/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { validate } from './middleware/validate.middleware';
import errorHandler from './middleware/errorHandler.middleware';
import { PrismaClient } from '@prisma/client';
import { CreateUserSchema } from './schemas/create-user.schema';
import bcrypt from 'bcrypt';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));

const db = new PrismaClient();

app.post('/', validate(CreateUserSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await db.user.create({
      data: {
        email,
        passwordHash: await bcrypt.hash(password, 10),
      },
    });
    return res.status(201).json({
      message: 'User created successfully',
    });
  } catch (err) {
    return next(err);
  }
});

app.use(errorHandler);

export default app;
