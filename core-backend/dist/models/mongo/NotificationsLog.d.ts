import mongoose, { Document } from 'mongoose';
export interface INotificationsLog extends Document {
    userId: string;
    alertId?: string;
    channel: 'sms' | 'app' | 'push';
    deliveryStatus: 'sent' | 'delivered' | 'failed';
    message: string;
    sentAt: Date;
}
export declare const NotificationsLog: mongoose.Model<INotificationsLog, {}, {}, {}, mongoose.Document<unknown, {}, INotificationsLog, {}, {}> & INotificationsLog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=NotificationsLog.d.ts.map