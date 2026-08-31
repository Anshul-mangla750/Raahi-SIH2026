import mongoose, { Schema, Document } from 'mongoose';

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

const AlertSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    type: { type: String, default: 'blocked_road' },
    severity: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
    },
    severityClass: { type: String, default: 'medium' },
    districtId: { type: String },
    routeId: { type: String },
    location: { type: String, required: true },
    time: { type: String, required: true },
    message: { type: String },
    translations: { type: Map, of: String, default: {} },
    channel: { type: String, default: 'app' },
    status: {
      type: String,
      enum: ['active', 'acknowledged', 'resolved'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export const Alert = mongoose.model<IAlert>('Alert', AlertSchema);
