import DoctorModel from '../database/models/Doctor.js'
import verifyRecaptcha from '../services/verifyRecaptcha.js'
import comparePassword from '../utils/comparePassword.js'

class DoctorsController {
  static #createCookie(res, key, value) {
    return res.cookie(key, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: true,
    })
  }

  static #removeCookie(res, key) {
    return res.clearCookie(key, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      signed: true,
    })
  }

  static async register(req, res) {
    try {
      const doctorData = req.body

      // Verify reCAPTCHA
      const isRecaptchaValid = await verifyRecaptcha(doctorData.recaptchaToken)
      if (!isRecaptchaValid) {
        return res.status(400).json({ message: 'reCAPTCHA verification failed' })
      }

      // Check if the email already exists
      const existingDoctor = await DoctorModel.findOne({ email: doctorData.email })
      if (existingDoctor) {
        return res.status(400).json({ message: 'Email already registered' })
      }

      // Create a new doctor
      const newDoctor = new DoctorModel(doctorData)
      await newDoctor.save()

      return res.status(201).json({ message: 'Registration successful' })
    } catch (error) {
      console.error('Registration error:', error)
      return res.status(500).json({ message: 'An error occurred while registering the doctor' })
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

      // Find the doctor by email
      const doctor = await DoctorModel.findOne({ email })
      if (!doctor) {
        return res.status(400).json({ message: 'Invalid email' })
      }

      // Compare the password
      const isPasswordMatch = await comparePassword(password, doctor.password)
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid password' })
      }

      // Generate a JWT token
      const token = await doctor.generateAuthToken()
      DoctorsController.#createCookie(res, 'jwt', token)

      return res.status(200).json({ message: 'Login successful' })
    } catch (error) {
      console.error('Login error:', error)
      return res.status(500).json({ message: 'An error occurred while logging in the doctor' })
    }
  }

  static async logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token)
      await DoctorModel.findByIdAndUpdate(req.user._id, { tokens: req.user.tokens })

      DoctorsController.#removeCookie(res, 'jwt')
      return res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
      console.error('Logout error:', error)
      return res.status(500).json({ message: 'An error occurred while logging out the doctor' })
    }
  }

  static async getAllDoctors(req, res) {
    try {
      // This is a placeholder for pagination logic
      const limit = parseInt(req.query.limit) || 6
      const page = parseInt(req.query.page) || 1
      const skip = (page - 1) * limit

      // This is a placeholder for search logic
      const search = req.query.search || ''
      const searchRegex = new RegExp(search.trim(), 'i')
      const searchQuery = {
        $or: [{ fullName: searchRegex }, { email: searchRegex }, { phoneNumber: searchRegex }],
      }

      // Fetch doctors from the database
      const doctors = await DoctorModel.find(searchQuery)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

      // Count total patients for pagination
      const totalDoctors = await DoctorModel.countDocuments(searchQuery)

      // Calculate total pages for pagination
      const totalPages = Math.ceil(totalDoctors / limit)

      return res.status(200).json({
        doctors,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalDoctors,
          totalPages,
        },
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'An error occurred while fetching doctors' })
    }
  }

  static async getProfile(req, res) {
    try {
      const doctor = await DoctorModel.findById(req.user._id).select('-password -tokens -_id')

      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' })
      }

      return res.status(200).json(doctor)
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ message: 'An error occurred while fetching the doctor profile' })
    }
  }
}

export default DoctorsController
