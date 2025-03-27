import DoctorModel from "../database/models/Doctor.js"
import verifyRecaptcha from "../database/models/utils/verifyRecaptcha.js"
import comparePassword from "../database/models/utils/comparePassword.js"

class DoctorsController {
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
      req.user.tokens = req.user.tokens.filter((tokenObj) => tokenObj.token !== req.token)
      await DoctorModel.findByIdAndUpdate(req.user._id, { tokens: req.user.tokens })

      DoctorsController.#removeCookie(res, 'jwt')
      return res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
      console.error('Logout error:', error)
      return res.status(500).json({ message: 'An error occurred while logging out the doctor' })
    }
  }
}

export default DoctorsController