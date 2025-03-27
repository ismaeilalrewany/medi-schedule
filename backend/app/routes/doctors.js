import express from 'express'
import Controller from '../controllers/doctors.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/logout', auth, Controller.logout)

export default router