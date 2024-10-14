import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof Error) {
    logger.error({ ...error });
  }

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json(error);
  }

  return res.status(500).json({
    code: 500,
    message: 'Internal server error',
  });
};

export default errorHandler;
