import AdminModel from '../database/models/Admin.js'
import PatientModal from '../database/models/Patient.js'
import DoctorModel from '../database/models/Doctor.js'
import verifyRecaptcha from '../database/models/utils/verifyRecaptcha.js'
import comparePassword from '../database/models/utils/comparePassword.js'

class AdminsController {
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

  static async #getUserById(req, res, model, notFoundMessage) {
    try {
      const userId = req.params.id
      const user = await model.findById(userId).select('-password -tokens -_id')

      if (!user) {
        return res.status(404).json({ message: notFoundMessage })
      }

      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: `An error occurred while fetching the ${notFoundMessage.toLowerCase()}` })
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

      // Find admin by email
      const admin = await AdminModel.findOne({ email })
      if (!admin) {
        return res.status(400).json({ message: 'Invalid email' })
      }

      // Compare passwords
      const isPasswordValid = await comparePassword(password, admin.password)
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' })
      }

      // Generate JWT token
      const token = await admin.generateAuthToken()
      AdminsController.#createCookie(res, 'jwt', token)

      return res.status(200).json({ message: 'Login successful' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token)
      await AdminModel.findByIdAndUpdate(req.user._id, { tokens: req.user.tokens })

      AdminsController.#removeCookie(res, 'jwt')
      return res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'An error occurred while logging out the admin' })
    }
  }

  static async getProfile(req, res) {
    try {
      const admin = await AdminModel.findById(req.user._id).select('-password -tokens -_id')

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
      }

      return res.status(200).json(admin)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'An error occurred while fetching the admin profile' })
    }
  }

  static async getPatient(req, res) {
    return AdminsController.#getUserById(req, res, PatientModal, 'Patient not found')
  }

  static async getDoctor(req, res) {
    return AdminsController.#getUserById(req, res, DoctorModel, 'Doctor not found')
  }
}

export default AdminsController