import express from 'express'
import AuthController from '../controller/authController.js'

const app = express()
const router = express.Router()

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)
router.post('/signout', AuthController.signout)

export default router