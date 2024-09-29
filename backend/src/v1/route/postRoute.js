import express from 'express'
import PostController from '../controller/postController.js'

const router = express.Router()

router.get('/', PostController.getAllPosts)
router.get('/:Id', PostController.getAPost)
router.post('/', PostController.createPost)
router.put('/:Id', PostController.updatePost)
router.delete('/:Id', PostController.deletePost)


export default router