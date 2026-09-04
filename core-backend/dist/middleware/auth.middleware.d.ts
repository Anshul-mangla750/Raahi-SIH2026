import { Request, Response, NextFunction } from 'express';
export interface AuthenticatedUser {
    id: string;
    customId?: string;
    name: string;
    email: string;
    role: 'admin' | 'transporter' | 'field_officer' | 'driver' | 'user' | string;
    districtId?: string | null;
    assignedDistrict?: string | null;
    transporterId?: string | null;
    agency?: string | null;
    company?: string | null;
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