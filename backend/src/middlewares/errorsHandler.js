import { Error } from 'mongoose';
import { HttpError } from 'http-errors';
import multer from 'multer';

export const errorsHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;

    return res.status(status).json({
      message: error.message,
    });
  }
  if (error instanceof Error.ValidationError || error instanceof HttpError) {
    const isProd = process.env.NODE_ENV === 'production';

    const message = isProd ? 'Some server problem' : error.message;

    const status = error.status ?? 500;

    return res.status(status).json({
      message,
    });
  }

  res.status(500).json({
    message: 'Internal Server Error',
  });
};
