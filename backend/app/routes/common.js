import express from 'express'
import auth from '../middleware/auth.js'
import Controller from '../controllers/common.js'

const router = express.Router()

router.get('/check-auth', auth, Controller.checkAuth)
router.get('/check-server', Controller.checkServer)

export default router