/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { validate } from './middleware/validate.middleware';
import errorHandler from './middleware/errorHandler.middleware';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { RegisterSchema } from './schemas/register.schema';
import { LoginSchema } from './schemas/login.schema';
import createHttpError from 'http-errors';
import Jwt from 'jsonwebtoken';
import env from './config/env';
import { auth } from './middleware/auth.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));

const db = new PrismaClient();

app.post('/register', validate(RegisterSchema), async (req, res, next) => {
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
  } catch (e) {
    return next(e);
  }
});

app.post('/login', validate(LoginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const token = Jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({
      token,
    });
  } catch (e) {
    return next(e);
  }
});

app.get('/', auth.required, (_req, res) => {
  res.send('OK');
});

app.use(errorHandler);

export default app;
