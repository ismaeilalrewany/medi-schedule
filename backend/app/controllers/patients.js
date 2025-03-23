import 'dotenv/config'
import axios from 'axios'
import PatientModel from '../database/models/Patient.js'

class PatientsController {
  static async register(req, res) {
    try {
      const patientData = req.body

      // Verify reCAPTCHA
      const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
      const recaptchaResponse = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: recaptchaSecret,
            response: patientData.recaptchaToken,
          },
        }
      )

      if (!recaptchaResponse.data.success) {
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

      // Store the token in the cookies
      // res.cookie('token', token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production', 
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      //   sameSite: 'lax',
      //   // domain: 'localhost',
      //   path: '/',
      // })

      res.status(201).json({ message: 'Registration successful', token })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'An error occurred while registering the patient' })
    }
  }

  static async logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token)
      await PatientModel.findByIdAndUpdate(req.user._id, { tokens: req.user.tokens })

      // Clear the token from the cookies
      // res.clearCookie('token', {
      //   // domain: 'localhost',
      //   path: '/',
      //   sameSite: 'lax',
      //   secure: process.env.NODE_ENV === 'production'
      // })

      res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'An error occurred while logging out the patient' })
    }
  }
}

export default PatientsController