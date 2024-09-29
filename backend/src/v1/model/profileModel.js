import mongoose, {Schema} from 'mongoose';

const userProfileSchema = new Schema({
  firstName: { type: String},
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
export default UserProfile;
