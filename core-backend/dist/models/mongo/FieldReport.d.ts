import mongoose, { Document } from 'mongoose';
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
export declare const FieldReport: mongoose.Model<IFieldReport, {}, {}, {}, mongoose.Document<unknown, {}, IFieldReport, {}, {}> & IFieldReport & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=FieldReport.d.ts.map