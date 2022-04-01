/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import logger from '@/logger';
import { ErrorException } from '@/error/error-exception';
import ErrorModel from '@/error/error-model';

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error(`Path: ${req.path} ->  ${err.message} \n ${err.stack}`);

  if (err instanceof ErrorException) {
    res.status(err.status).send(err);
  } else {
    // For unhandled errors.
    res.status(500).send({ code: 'UnknownError', status: 500 } as ErrorModel);
  }
};

export default errorHandler;
