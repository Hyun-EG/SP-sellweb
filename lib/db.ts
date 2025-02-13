import mongoose from 'mongoose';

// mongoose 연결 함수 추가
export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: 'sellweb', // 본인의 DB 이름 확인
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  } catch (error) {
    console.error('MongoDB 연결 실패:', error);
  }
};
