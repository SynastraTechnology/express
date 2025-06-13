import { Request, Response, NextFunction } from 'express';

const API_KEY = process.env.API_KEY;

export const verifyApikey = (req: Request, res: Response, next: NextFunction): void => {
  const { apikey } = req.body;

  if (apikey !== API_KEY) {
    res.status(401).json({
      iv: process.env.IV,
      timestamp: new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14),
      code: '500',
      message: 'INVALID_API_KEY'
    });
    return;
  }

  next();
};
