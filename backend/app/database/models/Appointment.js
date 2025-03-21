import mongoose from 'mongoose'
import PatientModel from './Patient.js'
import DoctorModel from './Doctor.js'

const AppointmentSchema = new mongoose.Schema({
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: PatientModel,
    required: true 
  },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: DoctorModel,
    required: true 
  },
  date: { type: Date, required: true },
  timeSlot: { 
    type: String, 
    required: true,
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'canceled'],
    default: 'pending', 
    lowercase: true 
  },
  reason: { type: String, trim: true },
  notes: { type: String, trim: true },
  createdBy: {
    type: String,
    enum: ['admin', 'patient'],
    required: true,
    lowercase: true
  }
}, { timestamps: true })

export default mongoose.model('Appointment', AppointmentSchema)