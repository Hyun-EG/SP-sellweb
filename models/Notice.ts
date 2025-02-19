import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date },
});

export default mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
