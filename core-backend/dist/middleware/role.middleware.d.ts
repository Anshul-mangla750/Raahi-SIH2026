import { Request, Response, NextFunction } from 'express';
export declare const requireRole: (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=role.middleware.d.ts.map