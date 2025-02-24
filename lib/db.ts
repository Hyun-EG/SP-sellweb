import mongoose from 'mongoose';

// MongoDB 연결 상태 확인 코드 추가
export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('✅ MongoDB Already Connected');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: 'sellweb',
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB 연결 실패:', error);
  }
};
