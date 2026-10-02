import { Error } from 'mongoose';
import { HttpError } from 'http-errors';

export const errorsHandler = (error, req, res, next) => {
  if (error instanceof Error.ValidationError || error instanceof HttpError) {
    const isProd = process.env.NODE_ENV === 'production';

    const message = isProd ? 'Some server problem' : error.message;

    const status = error.status ?? 500;

    console.log('\n========== DEBUG ==========');
    console.log(status);
    console.log('===========================\n');

    res.status(status).json({
      message,
    });
  }
};
