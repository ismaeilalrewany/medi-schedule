import 'dotenv/config'
import jwt from 'jsonwebtoken'
import PatientModel from '../database/models/Patient.js'
import DoctorModel from '../database/models/Doctor.js'
import AdminModel from '../database/models/Admin.js'

const auth = async (req, res, next) => {
  try {
    const token = await extractTokenFromRequest(req)
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

    attachUserAndTokenToRequest(req, user, token)
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    res.status(500).json({ message: 'Authentication failed', error: error.message })
  }
}

const extractTokenFromRequest = async (req) => {
  return await req.headers.authorization?.split(' ')[1]
}

const sendUnauthorizedResponse = (res, message) => {
  return res.status(401).json({ message })
}

const findUserByRole = async (role, userId) => {
  switch (role) {
    case 'patient':
      return await PatientModel.findById(userId)
    case 'doctor':
      return await DoctorModel.findById(userId)
    case 'admin':
      return await AdminModel.findById(userId)
    default:
      return null
  }
}

const attachUserAndTokenToRequest = (req, user, token) => {
  req.user = user
  req.token = token
}

export default auth