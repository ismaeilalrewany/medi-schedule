import express from 'express'
import Controller from '../controllers/patients.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/register', Controller.register)
router.post('/logout', auth, Controller.logout)
router.post('/login', Controller.login)

export default router