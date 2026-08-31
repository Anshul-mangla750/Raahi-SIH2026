import { Request, Response } from 'express';
export declare class MLProxyController {
    static getRouteScore(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getDisruptionPrediction(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static suggestRoute(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=ml-proxy.controller.d.ts.map