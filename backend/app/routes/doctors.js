import express from 'express'
import DoctorsController from '../controllers/doctors.js'
import AppointmentsController from '../controllers/appointments.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/register', DoctorsController.register)
router.post('/login', DoctorsController.login)
router.post('/logout', auth, DoctorsController.logout)
router.get('/', auth, DoctorsController.getAllDoctors)
router.get('/profile', auth, DoctorsController.getProfile)
router.get('/appointments', auth, AppointmentsController.getAppointments)

export default router