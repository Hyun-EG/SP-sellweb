import mongoose from 'mongoose';

const TempSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  imageUrls: { type: [String], required: false },
  service: { type: String, required: false },
  priceInfo: { type: String, required: false },
  sellingCount: { type: String, require: false },
  createdAt: { type: Date },
});

export default mongoose.models.Temp || mongoose.model('Temp', TempSchema);
