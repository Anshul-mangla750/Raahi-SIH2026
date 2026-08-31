import mongoose, { Schema, Document } from 'mongoose';

export interface IFieldReport extends Document {
  id: string;
  type: string;
  iconType: string;
  location: string;
  districtId: string;
  reportedBy: string;
  priority: 'High' | 'Medium' | 'Low' | 'Informational';
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
  reportedOn: string;
  image: string;
  photos: string[];
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  verifiedBy?: string;
  verifiedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FieldReportSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    iconType: { type: String, default: 'damage' },
    location: { type: String, required: true },
    districtId: { type: String, default: 'kamrup' },
    reportedBy: { type: String, required: true },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low', 'Informational'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
      default: 'Pending',
    },
    reportedOn: { type: String, required: true },
    image: { type: String, default: '/assets/field-reports/landslide.jpg' },
    photos: [{ type: String }],
    description: { type: String, required: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    verifiedBy: { type: String },
    verifiedAt: { type: Date },
    rejectionReason: { type: String },
  },
  { timestamps: true }
);

export const FieldReport = mongoose.model<IFieldReport>('FieldReport', FieldReportSchema);
