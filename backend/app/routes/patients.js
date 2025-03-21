import express from 'express'
import Controller from '../controllers/patients.js'

const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)

export default router