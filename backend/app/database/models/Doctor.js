import mongoose from 'mongoose'
import validator from 'validator'
import passwordComplexity from './utils/passwordComplexity.js'
import preSaveHook from './utils/preSaveHook.js'
import generateAuthToken from './utils/generateAuthToken.js'
import applyToJSON from './utils/applyToJSON.js'

const DoctorSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true, 
    validate: [validator.isEmail, 'Invalid email address'] 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 8,
    validate: passwordComplexity 
  },
  specialization: { type: String, required: true, trim: true },
  qualifications: [{ type: String, trim: true }],
  phoneNumber: { 
    type: String, 
    required: true, 
    trim: true, 
    validate: [validator.isMobilePhone, 'Invalid phone number'] 
  },
  gender: { 
    type: String, 
    enum: ['male', 'female'], 
    required: true, 
    lowercase: true 
  },
  availableTimeSlots: [{
    day: { 
      type: String, 
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], 
      lowercase: true 
    },
    startTime: { type: String },
    endTime: { type: String },
    isAvailable: { type: Boolean, default: true }
  }],
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true })

preSaveHook(DoctorSchema)

generateAuthToken(DoctorSchema)

applyToJSON(DoctorSchema)

export default mongoose.model('Doctor', DoctorSchema)