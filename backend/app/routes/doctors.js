import express from 'express'
import Controller from '../controllers/doctors.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/logout', auth, Controller.logout)
router.get('/', auth, Controller.getAllDoctors)
router.get('/profile', auth, Controller.getProfile)

export default router