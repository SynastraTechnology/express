import { Request, Response, NextFunction } from 'express';

const API_KEY = '06EAAA9D10BE3D4386D10144E267B681';

export const verifyApikey = (req: Request, res: Response, next: NextFunction): void => {
  const { apikey } = req.body;

  if (apikey !== API_KEY) {
    res.status(401).json({
      iv: 'JFKlnUZyyu0MzMbl',
      timestamp: new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14),
      code: '500',
      message: 'INVALID_API_KEY'
    });
    return;
  }

  next();
};
