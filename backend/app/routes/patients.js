import express from 'express'
import PatientsController from '../controllers/patients.js'
import AppointmentsController from '../controllers/appointment.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/register', PatientsController.register)
router.post('/logout', auth, PatientsController.logout)
router.post('/login', PatientsController.login)
router.get('/', auth, PatientsController.getAllPatients)
router.get('/profile', auth, PatientsController.getProfile)
router.post('/appointments', auth, AppointmentsController.createAppointment)

export default router