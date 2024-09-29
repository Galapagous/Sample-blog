import {Schema } from'mongoose';

const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true }
  }, { timestamps: true });
  
  const Comment = mongoose.model('Comment', commentSchema);
  module.exports = Comment;
  