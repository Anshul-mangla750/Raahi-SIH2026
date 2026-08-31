import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { sendError } from '../utils/response';

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'district_officer' | 'field_agent' | 'transporter' | 'driver' | 'viewer';
  districtId?: string | null;
  transporterId?: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authentication token missing or invalid', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwtAccessSecret) as AuthenticatedUser;
    req.user = decoded;
    return next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return sendError(res, 'Token has expired', 401);
    }
    return sendError(res, 'Invalid token', 401);
  }
};
