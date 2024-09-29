import Comment from './models/Comment';

export const createComment = async (commentData) => {
    try {
        const createComment = new Comment(commentData);
        const savedComment = await createComment.save();
        return savedComment;
    }catch(error) {
        console.log(error)
    }
   }
   
   export const getAllComments = async (postId) => {
       try {
        const comments = await Comment.find({ post: postId }).populate('author');
        return comments;
       } catch (error) {
        console.log(error)
       }
   }
   
   
   export const getCommentById = async (commentId) => {
       try {
           const comment = await Comment.findById(commentId).populate('author');
           return comment;
       } catch (error) {
        console.log(error);
       }
   }
   
   export const updateComment = async (commentId) => {
       try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, {new: true});
        return updatedComment;
       }catch(error){
        console.log(error);
       }
   }
   
   export const deleteComment = async (commentId) => {
       try{
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        return deletedComment;
       }catch(error){
        console.log(error);
       }
   }
   
   