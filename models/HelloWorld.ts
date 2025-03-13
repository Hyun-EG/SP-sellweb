import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

export default mongoose.models.Verification ||
  mongoose.model('Verification', verificationSchema);
