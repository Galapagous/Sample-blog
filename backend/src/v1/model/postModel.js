import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true , enum: ['food', 'lifestyle', 'programming']},
    avatar: { type: String, required: true },
    avatarURL: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }]
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
export default Post;
