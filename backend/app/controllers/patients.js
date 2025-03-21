import PatientModel from '../database/models/Patient.js'

class PatientsController {
  static async register(req, res) {
    try {
      const data = req.body
      console.log(data)
      res.status(201).json({ message: 'Registration successful' })
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while registering the patient' })
    }
  }

  static async login(req, res) {
    res.status(200).json({ message: 'Login successful' })
  }
}

export default PatientsController