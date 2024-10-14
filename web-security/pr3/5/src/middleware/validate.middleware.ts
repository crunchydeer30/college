/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { ParamsDictionary } from 'express-serve-static-core';
import { Request, RequestHandler, Response, NextFunction } from 'express';

export const validate =
  <TBody>(
    schema: z.ZodSchema<TBody>,
  ): RequestHandler<ParamsDictionary, any, TBody, any> =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (parsed.success) {
      req.body = parsed.data;
      return next();
    } else {
      return res.status(400).json(parsed.error);
    }
  };
