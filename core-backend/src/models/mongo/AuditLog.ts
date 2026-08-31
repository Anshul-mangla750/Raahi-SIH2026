import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  meta: Record<string, any>;
  timestamp: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: { type: String, required: true },
    meta: { type: Schema.Types.Mixed, default: {} },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
