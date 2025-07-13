import AppointmentModel from '../database/models/Appointment.js'
import PatientModel from '../database/models/Patient.js'
import DoctorModel from '../database/models/Doctor.js'
import { app } from '../app.js'

class AppointmentsController {
  static #dayNamesToNumbers = {
    'sunday': 0,
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6
  }

  static async #getUserId(req, model) {
    if (req.user.role === 'admin') {
      const userId = req.params.id
      const user = model === 'patient' ? await PatientModel.findById(userId) : await DoctorModel.findById(userId)

      if (!user) {
        return null
      }

      return userId
    } else {
      return req.user._id
    }
  }

  static #getDayNumber(day) {
    return AppointmentsController.#dayNamesToNumbers[day.toLowerCase()]
  }

  static #getHoursAndMinutes(time) {
    return time.split(':').map(Number)
  }

  static #greaterTimeOrEqual(time1, time2) {
    const [hours1, minutes1] = AppointmentsController.#getHoursAndMinutes(time1)
    const [hours2, minutes2] = AppointmentsController.#getHoursAndMinutes(time2)
    return (hours1 < hours2) || (hours1 === hours2 && minutes1 <= minutes2)
  }

  static #lesserTimeOrEqual(time1, time2) {
    const [hours1, minutes1] = AppointmentsController.#getHoursAndMinutes(time1)
    const [hours2, minutes2] = AppointmentsController.#getHoursAndMinutes(time2)
    return (hours1 > hours2) || (hours1 === hours2 && minutes1 >= minutes2)
  }

  static #checkDoctorAvailability(doctor, index, date, startTime, endTime) {
    let isAvailableDate = AppointmentsController.#getDayNumber(doctor.availableTimeSlots[index].day) === new Date(date).getDay()
    let isAvailableTime = AppointmentsController.#greaterTimeOrEqual(doctor.availableTimeSlots[index].startTime, startTime) && AppointmentsController.#lesserTimeOrEqual(doctor.availableTimeSlots[index].endTime, endTime)
    let isAvailable = doctor.availableTimeSlots[index].isAvailable
    return isAvailable && isAvailableDate && isAvailableTime
  }

  static async createAppointment(req, res) {
    try {
      // Don't need status and notes because doctors put them
      const {doctorId, date, startTime, endTime, reason} = req.body

      // Check if the appointment creator is a patient or an admin and set patientId accordingly
      const patientId = await AppointmentsController.#getUserId(req, 'patient')
      if (!patientId) {
        return res.status(404).json({ message: 'Patient not found' })
      }

      // Check if the doctor exists
      const doctor = await DoctorModel.findById(doctorId)
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' })
      }

      // Check if the patient has appointment already exists in the same date and time
      // Here is the same problem I descriped below with the doctorAppointments
      // I will make it better later Insha Allah
      const existingAppointment = await AppointmentModel.findOne({
        patient: patientId,
        date: new Date(date),
        startTime: startTime
      })
      if (existingAppointment) {
        return res.status(400).json({ message: 'Appointment already exists for this date and time' })
      }

      // Check if doctor is available at the given date and time
      for(let i = 0; i < doctor.availableTimeSlots.length; i++) {
        if (AppointmentsController.#checkDoctorAvailability(doctor, i, date, startTime, endTime)) {
          break
        }
        if (i === doctor.availableTimeSlots.length - 1) {
          return res.status(400).json({ message: 'Doctor is not available at this time' })
        }
      }

      // Doctor has another appointment at the same time
      // This is very simple because it only checks the start time
      // But the doctor could have appointment starts earlier and ends at the same end time
      // Or starts in the middle of the appointment or ends in the middle of the appointment
      const doctorAppointment = await AppointmentModel.findOne({
        doctor: doctorId,
        date: new Date(date),
        startTime: startTime,
      })
      if (doctorAppointment) {
        return res.status(400).json({ message: 'Doctor is not available at this time' })
      }

      // Create the appointment
      const appointment = new AppointmentModel({
        patient: patientId,
        doctor: doctorId,
        date: new Date(date),
        startTime: startTime,
        endTime: endTime,
        reason: reason,
        createdBy: req.user.role,
      })

      const savedAppointment = await appointment.save()
      return res.status(201).json({message: 'Appointment created successfully', appointment: savedAppointment})
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'An error occurred while creating the appointment' })
    }
  }

  static async getPatientAppointments(req, res) {
    try {
      // Check if the appointment creator is a patient or an admin and set patientId accordingly
      const patientId = await AppointmentsController.#getUserId(req, 'patient')
      if (!patientId) {
        return res.status(404).json({ message: 'Patient not found' })
      }

      // Pagination
      const limit = parseInt(req.query.limit) || 6
      const page = parseInt(req.query.page) || 1
      const skip = (page - 1) * limit

      // Find query
      const filterQuery = {patient: patientId}

      // Filter by status
      if (req.query.status && req.query.status !== 'all') {
        filterQuery.status = req.query.status.toLowerCase()
      }

      // Filter by date
      if (req.query.date) {
        filterQuery.date = new Date(req.query.date).toISOString()
      }

      // Search by name
      const searchRegex = new RegExp((req.query.search || '').trim(), 'i')
      if (req.query.search) {
        filterQuery['doctor.fullName'] = searchRegex
      }

      const appointments = await AppointmentModel.find(filterQuery)
        .populate('patient doctor', 'fullName specialization -_id')
        .select('-__v -createdAt -updatedAt')
        .sort({ date: 1, startTime: 1 })
        .skip(skip)
        .limit(limit)

      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found for this patient' })
      }

      return res.status(200).json({ message: 'Patient appointments retrieved successfully',
        appointments,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: appointments.length,
          totalPages: Math.ceil(appointments.length / limit)
        }
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'An error occurred while retrieving patient appointments' })
    }
  }

  static async getDoctorAppointments(req, res) {
    try {
      
    } catch (error) {
      
    }
  }
}

export default AppointmentsController