import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`!Request... ${new Date()}`);
  // console.log(req);
  next();
}
