import jwt from 'jsonwebtoken'
import 'dotenv/config'
import PatientModel from '../database/models/Patient.js'

const auth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization?.split(' ')[1]
    // console.log('Received token:', token)

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded?._id) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const patient = await PatientModel.findById(decoded._id)
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' })
    }

    req.user = patient
    req.token = token
    next();
  } catch (error) {
    console.error('Authentication error:', error)
    res.status(500).json({ message: 'Authentication failed', error: error.message })
  }
}

export default auth