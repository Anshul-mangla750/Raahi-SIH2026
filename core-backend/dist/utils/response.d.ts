import { Response } from 'express';
export declare const sendSuccess: (res: Response, data: any, message?: string, statusCode?: number) => Response<any, Record<string, any>>;
export declare const sendError: (res: Response, message?: string, statusCode?: number, errors?: any) => Response<any, Record<string, any>>;
//# sourceMappingURL=response.d.ts.map