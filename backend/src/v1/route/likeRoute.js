import express from 'express'
import { addLike, removeLike , getALikes, getAllLikes} from '../controller/likeController'

const router = express.Router()

router.get('/', getAllLikes)
router.get('/:Id', getALikes)
router.post('/add', addLike)
router.post('/remove', removeLike)

module.exports = router