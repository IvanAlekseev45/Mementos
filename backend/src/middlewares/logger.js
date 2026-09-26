import PinoHttp from 'pino-http';

export const logger = PinoHttp({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid, hostname',
      hideObject: true,
      messageFormat:
        '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
    },
  },
});
