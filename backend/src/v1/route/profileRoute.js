import express from 'express'
import ProfileController from '../controller/profileController.js'

const router = express.Router()

// router.get('/', ProfileController.)
router.get('/:Id', ProfileController.getProfile)
router.put('/:Id', ProfileController.updateProfile)
router.delete('/:Id', ProfileController.deleteProfile)


export default router