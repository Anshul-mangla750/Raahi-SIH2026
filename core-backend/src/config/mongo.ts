import mongoose from 'mongoose';
import { env } from './env';

export const connectMongo = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('✅ MongoDB (Atlas) connected successfully.');
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
};
