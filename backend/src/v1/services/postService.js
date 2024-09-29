import Post from "../model/postModel.js";


class PostService {


    createPost = async (postData) => {
        try{
            const newPost = new Post(postData);
            const savedPost = await newPost.save();
            return savedPost;
        }catch(error){
            console.log(error)
        }
    }


    getAllPosts = async () => {
        try{
            const posts = await Post.find();
            return posts;
        }catch(error){
            console.log(error)
        }
    }


    getPost = async (query) => {
        try{
            const post = await Post.find(query);
            if(!post) throw new Error('Post not found');
            return post;
        }catch(error){
            console.log(error)
        }
    }


    updatePost = async (postId, postData) => {
        try {
            const updatedPost = await Post.findByIdAndUpdate(postId, postData, {new: true});
            return updatedPost;
        } catch (error) {
            console.log(error)
        }
    }

    deletePost = async (postId) => {
        try{
            const deletedPost = await Post.findByIdAndDelete(postId);
            return deletedPost;
        }catch(error){
            console.log(error)
        }
    }

}


export default new PostService