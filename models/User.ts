import mongoose from 'mongoose';

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// User 모델을 mongoose 모델로 정의
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
