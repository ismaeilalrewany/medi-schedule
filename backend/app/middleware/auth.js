import 'dotenv/config'
import jwt from 'jsonwebtoken'

import PatientModel from '../database/models/Patient.js'
import DoctorModel from '../database/models/Doctor.js'
import AdminModel from '../database/models/Admin.js'

const sendUnauthorizedResponse = (res, message) => {
  return res.status(401).json({ message })
}

const findUserByRole = (role, userId) => {
  switch (role) {
    case 'patient':
      return PatientModel.findById(userId)
    case 'doctor':
      return DoctorModel.findById(userId)
    case 'admin':
      return AdminModel.findById(userId)
    default:
      return null
  }
}

const auth = async (req, res, next) => {
  try {
    const token = req.signedCookies.jwt
    if (!token) {
      return sendUnauthorizedResponse(res, 'Unauthorized')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded?._id) {
      return sendUnauthorizedResponse(res, 'Invalid token')
    }

    const user = await findUserByRole(decoded.role, decoded._id)
    if (!user) {
      return sendUnauthorizedResponse(res, 'User not found')
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    res.status(500).json({ message: 'Authentication failed', error: error.message })
  }
}

export default auth
