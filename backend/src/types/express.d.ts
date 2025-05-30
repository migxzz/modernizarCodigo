import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        email: string;
      };
    }
  }
}