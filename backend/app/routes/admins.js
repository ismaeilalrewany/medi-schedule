import express from 'express'
import Controller from '../controllers/admins.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/login', Controller.login)
router.post('/logout', auth, Controller.logout)

export default router