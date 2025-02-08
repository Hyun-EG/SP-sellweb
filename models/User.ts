import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: { type: String, require: true },
  userId: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  phoneNumber: { type: String, require: true, unique: true },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
