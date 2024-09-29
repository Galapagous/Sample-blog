import express from 'express'
import { deleteComment, getAllComments, createComment, getCommentById, updateComment } from '../controller/commentController'

const router = express.Router()

router.get('/', getAllComments)
router.get('/:Id', getCommentById)
router.put('/:Id', createComment)
router.put('/:Id', updateComment)
router.delete('/:Id', deleteComment)

export default router