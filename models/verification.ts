import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

const Verification =
  mongoose.models.Verification ||
  mongoose.model('Verification', verificationSchema);

export default Verification;
