import mongoose from 'mongoose';

const TempSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrls: { type: [String], required: true },
  service: { type: String, required: true },
  priceInfo: { type: String, required: true },
  createdAt: { type: Date },
});

export default mongoose.models.Temp || mongoose.model('Temp', TempSchema);
