import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function logRequest(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
    body: req.body,
    query: req.query,
  });
  next();
} 