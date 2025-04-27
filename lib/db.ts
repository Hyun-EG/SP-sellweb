import mongoose from 'mongoose';

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: 'sellweb',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
