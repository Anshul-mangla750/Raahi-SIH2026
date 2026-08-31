import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
export declare const validate: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=validate.middleware.d.ts.map