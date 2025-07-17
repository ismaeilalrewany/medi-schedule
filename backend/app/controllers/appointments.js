import AppointmentModel from '../database/models/Appointment.js'
import PatientModel from '../database/models/Patient.js'
import DoctorModel from '../database/models/Doctor.js'
import { ObjectId } from 'mongodb'

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

  static #pagination = {
    limit : 6,
    page : 1,
    get skip() {
      return (this.page - 1) * this.limit
    }
  }

  static #setPagination(req) {
    const limit = parseInt(req.query.limit) || AppointmentsController.#pagination.limit
    const page = parseInt(req.query.page) || AppointmentsController.#pagination.page

    AppointmentsController.#pagination.limit = limit
    AppointmentsController.#pagination.page = page
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

  static #createAggregationPipeline(req, userId, role) {
    const pipeline = []

    // Convert userId to ObjectId if it's a string
    const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId

    // Match by role (patient or doctor)
    const matchStage = {[role]: objectId}

    // Filter by status
    if (req.query.status && req.query.status !== 'all') {
      matchStage.status = req.query.status.toLowerCase()
    }

    // Filter by date
    if (req.query.date) {
      matchStage.date = new Date(req.query.date)
    }

    pipeline.push({ $match: matchStage })

    // Populate patient and doctor
    pipeline.push(
      {
        $lookup: {
          from: 'patients',
          localField: 'patient',
          foreignField: '_id',
          as: 'patient'
        }
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'doctor',
          foreignField: '_id',
          as: 'doctor'
        }
      },
      {
        $unwind: '$patient'
      },
      {
        $unwind: '$doctor'
      }
    )

    // Search by name (works after population)
    if (req.query.search) {
      const searchRegex = new RegExp((req.query.search || '').trim(), 'i')
      const searchField = role === 'patient' ? 'doctor.fullName' : 'patient.fullName'
      pipeline.push({
        $match: {
          [searchField]: searchRegex
        }
      })
    }

    // Project fields (exclude __v, createdAt, updatedAt)
    pipeline.push({
      $project: {
        _id: 1,
        patient: {
          fullName: 1
        },
        doctor: {
          fullName: 1,
          specialization: 1
        },
        date: 1,
        startTime: 1,
        endTime: 1,
        reason: 1,
        notes: 1,
        status: 1,
        createdBy: 1
      }
    })

    // Sort logic
    // Add status order field for custom status sorting
    pipeline.push({
      $addFields: {
        statusOrder: {
          $switch: {
            branches: [
              { case: { $eq: ['$status', 'pending'] }, then: 0 },
              { case: { $eq: ['$status', 'confirmed'] }, then: 1 },
              { case: { $eq: ['$status', 'completed'] }, then: 2 },
              { case: { $eq: ['$status', 'canceled'] }, then: 3 }
            ],
            default: 4
          }
        }
      }
    })

    // Apply automatic sorting: status first, then date, then startTime
    pipeline.push({ 
      $sort: {
        statusOrder: 1,    // Sort by status priority (pending -> confirmed -> completed -> canceled)
        date: 1,           // Then by date (earliest first)
        startTime: 1       // Finally by start time (earliest first)
      }
    })

    return pipeline
  }

  static async createAppointment(req, res) {
    try {
      // Don't need status and notes because doctors put them
      const {doctorId, date, startTime, endTime, reason, notes} = req.body

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
        notes: notes,
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

      // Set and get pagination data
      AppointmentsController.#setPagination(req)
      const { limit, page, skip } = AppointmentsController.#pagination

      // Get aggregation pipeline
      const pipeline = AppointmentsController.#createAggregationPipeline(req, patientId, 'patient')
      
      // Add pagination stages
      const paginationPipeline = [
        ...pipeline,
        { $skip: skip },
        { $limit: limit }
      ]

      // Execute aggregation
      const appointments = await AppointmentModel.aggregate(paginationPipeline)

      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found for this patient' })
      }

      // Get total count for pagination
      const countPipeline = [
        ...pipeline,
        { $count: 'total' }
      ]
      const totalResult = await AppointmentModel.aggregate(countPipeline)
      const totalItems = totalResult.length > 0 ? totalResult[0].total : 0

      return res.status(200).json({ 
        message: 'Patient appointments retrieved successfully',
        appointments,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / limit)
        }
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'An error occurred while retrieving patient appointments' })
    }
  }

  static async getDoctorAppointments(req, res) {
    try {
      // Check if the appointment creator is a doctor or an admin and set doctorId accordingly
      const doctorId = await AppointmentsController.#getUserId(req, 'doctor')
      if (!doctorId) {
        return res.status(404).json({ message: 'Doctor not found' })
      }

      // Set and get pagination data
      AppointmentsController.#setPagination(req)
      const { limit, page, skip } = AppointmentsController.#pagination

      // Get aggregation pipeline
      const pipeline = AppointmentsController.#createAggregationPipeline(req, doctorId, 'doctor')
      
      // Add pagination stages
      const paginationPipeline = [
        ...pipeline,
        { $skip: skip },
        { $limit: limit }
      ]

      // Execute aggregation
      const appointments = await AppointmentModel.aggregate(paginationPipeline)

      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found for this doctor' })
      }

      // Get total count for pagination
      const countPipeline = [
        ...pipeline,
        { $count: 'total' }
      ]
      const totalResult = await AppointmentModel.aggregate(countPipeline)
      const totalItems = totalResult.length > 0 ? totalResult[0].total : 0

      return res.status(200).json({ 
        message: 'Doctor appointments retrieved successfully',
        appointments,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / limit)
        }
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'An error occurred while retrieving doctor appointments' })
    }
  }
}

export default AppointmentsController