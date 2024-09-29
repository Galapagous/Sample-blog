import FileService from "../services/fileService.js";
import PostService from "../services/postService.js";
import ProfileService from "../services/profileService.js";

class PostController{

    
    getAllPosts = async (req, res) => {
        const query = Object.keys(req.query)[0]
        const value = Object.values(req.query)[0]
        console.log(value)
        
        try {
            const allPost = await PostService.getAllPosts();
            let updatedPost;
            if(query) {
                // posible query and response
                switch (query) {
                    // max ruturned values
                    case 'max':
                        console.log('max runs')
                        break;
                    // return by category
                    case 'cat':
                        console.log('cat runs')
                        break;
                    // return most liked post
                    case 'pag':
                        console.log('pag runs')
                        break;
                        
                        default:
                        console.log('def runs')
                        updatedPost = allPost
                        break;
                }
            }
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json('error fetching data')
        }
    }



    getAPost = async (req, res) => {
        const query = req.query
        try {
            const post = await PostService.getPost(query)
            res.status(200).json(post)
        } catch (error) {
            res.status()
        }
    }



    createPost = async (req, res) => {
        const {title, content, avatar, author} = req.body
        // save post image
        const avatarURL = req.file.filename
        if(!title || !content || !avatar || !author) return res.status(401).json('Some field are missing')
        const updatedPost = {title, content, avatar, avatarURL, author}
    try {
        const newPost = await PostService.createPost(updatedPost)
        // update post owner
            await ProfileService.updateProfile(author, {$push: {posts: newPost._id}})
            res.status(200).json(newPost)
        } catch (error) {
            console.log(error)
        }

    }



    updatePost = async (req, res) => {
        const {id} = req.params
        if(!id) return res.status(401).json('Some items are missing')
        
        // update post
        try {
            const updatedPost = PostService.updatePost(id, req.body)
            res.status(200).json(updatedPost)
        } catch (error) {
            res.status(500).json('Some error has occured')
            console.log(error)
        }
    }



    deletePost = async (req, res) => {
        const {id} = req.params
        try {
            const deletedPost = PostService.deletePost(id)
            // remove from owner list
            await PostService.updatePost(id, {$pull: {posts: id}})
            res.status(200).json(deletedPost)
        } catch (error) {
            res.status(500).json('error deleting post')
        }
    }


}

export default new PostController