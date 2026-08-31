import { Request, Response, NextFunction } from 'express';
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
export declare const authenticateJwt: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.middleware.d.ts.map