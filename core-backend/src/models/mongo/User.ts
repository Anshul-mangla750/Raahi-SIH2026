import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export type UserRole = 'admin' | 'transporter' | 'field_officer' | 'driver' | 'user';

export interface IUser extends Document {
  customId?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  status: 'active' | 'inactive';
  
  // Role specific fields
  assignedDistrict?: string; // field_officer
  agency?: string;           // field_officer / admin
  company?: string;          // transporter
  companyName?: string;      // transporter
  fleetSize?: number;        // transporter
  
  transporterId?: string;    // driver (linked to transporter)
  licenseNo?: string;        // driver
  vehicleNo?: string;        // driver
  vehicleType?: string;      // driver
  safetyScore?: number;      // driver
  tripsCompleted?: number;   // driver
  
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    customId: {
      type: String,
      trim: true,
      index: true,
      sparse: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [4, 'Password must be at least 4 characters long'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['admin', 'transporter', 'field_officer', 'field_worker', 'driver', 'user'],
      default: 'user',
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    
    // Field Officer details
    assignedDistrict: {
      type: String,
      trim: true,
    },
    agency: {
      type: String,
      trim: true,
    },
    
    // Transporter details
    company: {
      type: String,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    fleetSize: {
      type: Number,
      default: 0,
    },
    
    // Driver details
    transporterId: {
      type: String,
      trim: true,
      index: true,
    },
    licenseNo: {
      type: String,
      trim: true,
    },
    vehicleNo: {
      type: String,
      trim: true,
    },
    vehicleType: {
      type: String,
      enum: ['Truck', 'Van', '4x4 High-Torque', 'Tanker', 'Emergency Vehicle', 'Heavy Trailer', 'Other'],
      default: 'Truck',
    },
    safetyScore: {
      type: Number,
      default: 95.0,
    },
    tripsCompleted: {
      type: Number,
      default: 0,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

// Hash password before saving if modified
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Transform to JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

export const MongoUser: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
