export const errorsHandler = (error, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  const message = isProd ? 'Some server problem' : error.message;

  const status = error.status ?? 500;

  res.status(status).json({
    message,
  });
};
