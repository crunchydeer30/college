import Jwt from 'jsonwebtoken';
import env from '../config/env';
import { Request, Response, NextFunction } from 'express';

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
