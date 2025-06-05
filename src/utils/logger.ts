import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

export const logger = createLogger({
  level: 'info',
  format: combine(
    colorize({ all: true }),
    timestamp(),
    printf(({ timestamp, level, message, ...meta }) => {
      return `[${timestamp}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    })
  ),
  transports: [
    new transports.Console(),
  ],
}); 