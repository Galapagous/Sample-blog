import mongoose, {Schema} from'mongoose';

const likeSchema = new Schema({
    postLike: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    author: {type: Schema.Types.ObjectId, ref: 'UserProfile', required: true},
}, {timestamps: true});

const Like = mongoose.model('Like', likeSchema);
export default Like;