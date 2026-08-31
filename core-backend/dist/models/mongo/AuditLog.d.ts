import mongoose, { Document } from 'mongoose';
export interface IAuditLog extends Document {
    userId: string;
    action: string;
    entityType: string;
    entityId: string;
    meta: Record<string, any>;
    timestamp: Date;
}
export declare const AuditLog: mongoose.Model<IAuditLog, {}, {}, {}, mongoose.Document<unknown, {}, IAuditLog, {}, {}> & IAuditLog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=AuditLog.d.ts.map