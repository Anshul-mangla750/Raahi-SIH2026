import mongoose, { Schema, Document } from 'mongoose';

export interface INotificationsLog extends Document {
  userId: string;
  alertId?: string;
  channel: 'sms' | 'app' | 'push';
  deliveryStatus: 'sent' | 'delivered' | 'failed';
  message: string;
  sentAt: Date;
}

const NotificationsLogSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    alertId: { type: String },
    channel: {
      type: String,
      enum: ['sms', 'app', 'push'],
      default: 'app',
    },
    deliveryStatus: {
      type: String,
      enum: ['sent', 'delivered', 'failed'],
      default: 'delivered',
    },
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const NotificationsLog = mongoose.model<INotificationsLog>('NotificationsLog', NotificationsLogSchema);
