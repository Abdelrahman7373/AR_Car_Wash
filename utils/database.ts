//@ts-nocheck

import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!, {
        dbName: 'AR_Car_Wash',
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log('MongoDB connected ✅');
        return mongoose;
      })
      .catch((err) => {
        console.error('MongoDB connection error ❌:', err);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
