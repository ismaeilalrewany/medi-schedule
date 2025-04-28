import PatientModel from '../database/models/Patient.js'
import comparePassword from '../database/models/utils/comparePassword.js'
import verifyRecaptcha from '../database/models/utils/verifyRecaptcha.js'

class PatientsController {
  static #createCookie(res, key, value) {
    return res.cookie(key, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: true})
  }

  static #removeCookie(res, key) {
    return res.clearCookie(key, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      signed: true})
  }

  static async register(req, res) {
    try {
      const patientData = req.body

      // Verify reCAPTCHA
      const isRecaptchaValid = await verifyRecaptcha(patientData.recaptchaToken)
      if (!isRecaptchaValid) {
        return res.status(400).json({ message: 'reCAPTCHA verification failed' })
      }

      // Check if the email already exists
      const existingPatient = await PatientModel.findOne({ email: patientData.email })
      if (existingPatient) {
        return res.status(400).json({ message: 'Email already registered' })
      }

      // Create a new patient
      const newPatient = new PatientModel({
        fullName: patientData.fullName,
        email: patientData.email,
        password: patientData.password,
        phoneNumber: patientData.phoneNumber,
        dateOfBirth: patientData.dateOfBirth,
        gender: patientData.gender,
        medicalHistory: patientData.medicalHistory,
      })
      await newPatient.save()

      // Generate a JWT token
      const token = await newPatient.generateAuthToken()
      PatientsController.#createCookie(res, 'jwt', token)

      return res.status(201).json({ message: 'Registration successful', token })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'An error occurred while registering the patient' })
    }
  }

  static async login(req, res) {
    try {
      const { email, password, recaptchaToken } = req.body

      // Verify reCAPTCHA
      const isRecaptchaValid = await verifyRecaptcha(recaptchaToken)
      if (!isRecaptchaValid) {
        return res.status(400).json({ message: 'reCAPTCHA verification failed' })
      }

      // Find the patient by email
      const patient = await PatientModel.findOne({ email })
      if (!patient) {
        return res.status(400).json({ message: 'Invalid email' })
      }

      // Check if the password is correct
      const isPasswordMatch = comparePassword(password, patient.password)
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid password' })
      }

      // Generate a JWT token
      const token = await patient.generateAuthToken()
      PatientsController.#createCookie(res, 'jwt', token)

      return res.status(200).json({ message: 'Login successful' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'An error occurred while logging in the patient' })
    }
  }

  static async logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token)
      await PatientModel.findByIdAndUpdate(req.user._id, { tokens: req.user.tokens })

      PatientsController.#removeCookie(res, 'jwt')
      return res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'An error occurred while logging out the patient' })
    }
  }

  static async getAllPatients(req, res) {
    try {
      // This is a placeholder for pagination logic
      const limit = parseInt(req.query.limit) || 6
      const page = parseInt(req.query.page) || 1
      const skip = (page - 1) * limit

      // This is a placeholder for search logic
      const search = req.query.search || ''
      const searchRegex = new RegExp(search.trim(), 'i')
      const searchQuery = {
        $or: [
          { fullName: searchRegex },
          { email: searchRegex },
          { phoneNumber: searchRegex },
        ],
      }

      // Fetch patients from the database
      const patients = await PatientModel.find(searchQuery)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

      // Count total patients for pagination
      const totalPatients = await PatientModel.countDocuments(searchQuery)

      // Calculate total pages for pagination
      const totalPages = Math.ceil(totalPatients / limit)

      return res.status(200).json({
        patients,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalPatients,
          totalPages,
        }
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'An error occurred while fetching patients' })
    }
  }

  static async getProfile (req, res) {
    try {
      const patient = await PatientModel.findById(req.user._id).select('-password -tokens -_id')

      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' })
      }

      return res.status(200).json(patient)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'An error occurred while fetching the patient profile' })
    }
  }
}

export default PatientsController