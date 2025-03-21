import express from 'express'
import Controller from '../controllers/admins.js'

const router = express.Router()

router.post('/login', Controller.login)

export default router