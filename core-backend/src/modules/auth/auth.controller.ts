import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { sendSuccess, sendError } from '../../utils/response';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register(req.body);
      return sendSuccess(res, result, 'User registered successfully', 201);
    } catch (err: any) {
      return sendError(res, err.message, 400);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return sendSuccess(res, result, 'Login successful');
    } catch (err: any) {
      return sendError(res, err.message, 401);
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const tokens = await AuthService.refresh(refreshToken);
      return sendSuccess(res, tokens, 'Token refreshed successfully');
    } catch (err: any) {
      return sendError(res, err.message, 401);
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      if (req.user?.id) {
        await AuthService.logout(req.user.id);
      }
      return sendSuccess(res, null, 'Logged out successfully');
    } catch (err: any) {
      return sendError(res, err.message, 500);
    }
  }

  static async me(req: Request, res: Response) {
    return sendSuccess(res, req.user, 'Current user profile');
  }
}
