import { Request, Response } from 'express';
export declare class AdminController {
    static getOverviewKpis(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getRecentAlerts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getDistricts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getDistrictById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getDistrictRoads(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getRoutes(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getRouteRisk(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getRouteAlternates(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getVehicles(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getVehicleById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAlerts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createAlert(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateAlert(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getFieldReports(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static verifyFieldReport(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static rejectFieldReport(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getSupplyChainGaps(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getDeliveries(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getDisruptionTrends(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getDelayTrends(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static exportAnalytics(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=admin.controller.d.ts.map