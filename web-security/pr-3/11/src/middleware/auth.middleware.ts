import Jwt from 'jsonwebtoken';
import env from '../config/env';
import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

export const auth = {
  optional: (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (token) {
      res.locals.user = Jwt.verify(token, env.JWT_SECRET);
    }
    return next();
  },
  required: (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (token) {
      res.locals.user = Jwt.verify(token, env.JWT_SECRET);
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
  },
  admin: (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (token) {
      const user = Jwt.verify(token, env.JWT_SECRET) as {
        id: number;
        role: Role;
      };
      if (user.role !== Role.ADMIN) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      res.locals.user = user;
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
  },
};

const extractToken = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};
