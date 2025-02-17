import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
