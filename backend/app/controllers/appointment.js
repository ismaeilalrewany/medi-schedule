import AppointmentModal from '../database/models/Appointment.js'
import PatientModel from '../database/models/Patient.js'
import DoctorModel from '../database/models/Doctor.js'

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

  static #checkDoctorAvailability(doctorAvailability, index, date, startTime, endTime) {
    let isAvailableDate = AppointmentsController.#getDayNumber(doctorAvailability.availableTimeSlots[index].day) === new Date(date).getDay()
    let isAvailableTime = AppointmentsController.#greaterTimeOrEqual(doctorAvailability.availableTimeSlots[index].startTime, startTime) && AppointmentsController.#lesserTimeOrEqual(doctorAvailability.availableTimeSlots[index].endTime, endTime)
    let isAvailable = doctorAvailability.availableTimeSlots[index].isAvailable
    return isAvailable && isAvailableDate && isAvailableTime
  }

  static async createAppointment(req, res) {
    try {
      // Don't need status and notes because doctors put them
      const createdBy = req.user.role
      const {doctorId, date, startTime, endTime, reason} = req.body
      let patientId = null

      // Check if the appointment creator is a patient or an admin and set patientId accordingly
      if (createdBy === 'admin') {
        patientId = req.params.id

        const patient = await PatientModel.findById(patientId)
        if (!patient) {
          return res.status(404).json({ message: 'Patient not found' })
        }
      } else {
        patientId = req.user._id
      }

      // Check if the doctor exists
      const doctor = await DoctorModel.findById(doctorId)
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' })
      }

      // Check if the patient has appointment already exists in the same date and time
      // Here is the same problem I descriped below with the doctorAppointments
      // I will make it better later Insha Allah
      const existingAppointment = await AppointmentModal.findOne({
        patient: patientId,
        date: new Date(date),
        startTime: startTime
      })
      if (existingAppointment) {
        return res.status(400).json({ message: 'Appointment already exists for this date and time' })
      }

      // Check if doctor is available at the given date and time
      const doctorAvailability = await DoctorModel.findById(doctorId).select('availableTimeSlots')
      for(let i = 0; i < doctorAvailability.availableTimeSlots.length; i++) {
        if (AppointmentsController.#checkDoctorAvailability(doctorAvailability, i, date, startTime, endTime)) {
          break
        }
        if (i === doctorAvailability.availableTimeSlots.length - 1) {
          return res.status(400).json({ message: 'Doctor is not available at this time' })
        }
      }

      // Doctor has another appointment at the same time
      // This is very simple because it only checks the start time
      // But the doctor could have appointment starts earlier and ends at the same end time
      // Or starts in the middle of the appointment or ends in the middle of the appointment
      const doctorAppointment = await AppointmentModal.findOne({
        doctor: doctorId,
        date: new Date(date),
        startTime: startTime,
      })
      if (doctorAppointment) {
        return res.status(400).json({ message: 'Doctor is not available at this time' })
      }

      // Create the appointment
      const appointment = new AppointmentModal({
        patient: patientId,
        doctor: doctorId,
        date: new Date(date),
        startTime: startTime,
        endTime: endTime,
        reason: reason,
        createdBy: createdBy,
      })

      const savedAppointment = await appointment.save()
      return res.status(201).json({message: 'Appointment created successfully', appointment: savedAppointment})
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'An error occurred while creating the appointment' })
    }
  }
}

export default AppointmentsController