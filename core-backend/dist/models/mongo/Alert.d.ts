import mongoose, { Document } from 'mongoose';
export interface IAlert extends Document {
    id: string;
    title: string;
    type: string;
    severity: 'High' | 'Medium' | 'Low';
    severityClass: string;
    districtId?: string;
    routeId?: string;
    location: string;
    time: string;
    message: string;
    translations?: Record<string, string>;
    channel?: string;
    status: 'active' | 'acknowledged' | 'resolved';
    createdAt: Date;
    updatedAt: Date;
}
export declare const Alert: mongoose.Model<IAlert, {}, {}, {}, mongoose.Document<unknown, {}, IAlert, {}, {}> & IAlert & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Alert.d.ts.map