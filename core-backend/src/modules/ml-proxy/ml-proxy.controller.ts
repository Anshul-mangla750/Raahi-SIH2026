import { Request, Response } from 'express';
import { MLProxyService } from './ml-proxy.service';
import { sendSuccess, sendError } from '../../utils/response';

export class MLProxyController {
  static async getRouteScore(req: Request, res: Response) {
    try {
      const result = await MLProxyService.calculateRouteScore(req.body);
      return sendSuccess(res, result, 'ML Route risk assessment calculated');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async getDisruptionPrediction(req: Request, res: Response) {
    try {
      const { districtId, weatherSnapshot } = req.body;
      const result = await MLProxyService.predictDisruption(districtId, weatherSnapshot);
      return sendSuccess(res, result, 'Disruption forecast retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async suggestRoute(req: Request, res: Response) {
    try {
      const { originDistrictId, destDistrictId } = req.body;
      const result = await MLProxyService.suggestAlternateRoute(originDistrictId, destDistrictId);
      return sendSuccess(res, result, 'Optimized routing suggestion generated');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }
}
