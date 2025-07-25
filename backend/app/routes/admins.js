import express from 'express'

import AdminsController from '../controllers/admins.js'
import AppointmentsController from '../controllers/appointments.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/login', AdminsController.login)
router.post('/logout', auth, AdminsController.logout)
router.get('/profile', auth, AdminsController.getProfile)
router.get('/patients/:id', auth, AdminsController.getPatient)
router.get('/doctors/:id', auth, AdminsController.getDoctor)
router.post('/patients/:id/appointments', auth, AppointmentsController.createAppointment)
router.get('/patients/:id/appointments', auth, AppointmentsController.getPatientAppointments)
router.get('/doctors/:id/appointments', auth, AppointmentsController.getDoctorAppointments)

export default router
