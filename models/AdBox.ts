import mongoose from 'mongoose';

const AdBoxSchema = new mongoose.Schema({
  content: { type: String },
});

export default mongoose.models.AdBox || mongoose.model('AdBox', AdBoxSchema);
