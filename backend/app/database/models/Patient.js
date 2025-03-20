import mongoose from 'mongoose'
import validator from 'validator'
import passwordComplexity from './utils/passwordComplexity.js'
import preSaveHook from './utils/preSaveHook.js'
import generateAuthToken from './utils/generateAuthToken.js'
import applyToJSON from './utils/applyToJSON.js'

const PatientSchema = new mongoose.Schema({
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
  phoneNumber: { 
    type: String, 
    required: true, 
    trim: true, 
    validate: [validator.isMobilePhone, 'Invalid phone number'] 
  },
  dateOfBirth: { type: Date },
  gender: { 
    type: String, 
    enum: ['male', 'female'], 
    required: true, 
    lowercase: true 
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true }
  },
  medicalHistory: { type: String, trim: true },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true })

preSaveHook(PatientSchema)

generateAuthToken(PatientSchema)

applyToJSON(PatientSchema)

export default mongoose.model('Patient', PatientSchema)