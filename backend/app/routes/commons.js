import express from 'express'
import auth from '../middleware/auth.js'
import CommonsController from '../controllers/commons.js'

const router = express.Router()

router.get('/check-auth', auth, CommonsController.checkAuth)
router.get('/check-server', CommonsController.checkServer)

export default router