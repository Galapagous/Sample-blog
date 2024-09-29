import express from 'express'
import { addLike, removeLike } from '../controller/likeController'

const router = express.Router()

router.get('/', getFollow)
router.getAll('/', getAllFollow)
router.post('/', addFollow)
router.delete('/:Id', removeFollow)

module.exports = router