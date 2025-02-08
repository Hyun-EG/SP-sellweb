import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

export async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI);
    } catch (error) {
      console.error('DB 연결 실패:', error);
      throw new Error('DB 연결 실패');
    }
  }
}
