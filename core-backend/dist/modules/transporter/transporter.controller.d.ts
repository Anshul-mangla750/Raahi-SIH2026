import { Request, Response } from 'express';
export declare class TransporterController {
    static getOverviewKpis(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static planTrip(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createTrip(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getTrips(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getVehicles(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createVehicle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateVehicle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteVehicle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getDrivers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createDriver(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateDriver(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteDriver(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAlerts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getDeliveries(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateDeliveryStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static uploadProofOfDelivery(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createFieldReport(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getDocuments(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getDeliveryHistory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static exportReports(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=transporter.controller.d.ts.map