import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    provider: {
      type: String,
      enum: ['google', 'kakao', 'credentials'],
      required: true,
    },
    email: { type: String, required: true, unique: true },
    refreshToken: { type: String },
    verificationCode: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
