import mongoose from 'mongoose'
import validator from 'validator'
import { validatePasswordComplexity, mongoosePasswordValidator } from '../../utils/passwordComplexity.js'
import preSaveHashHook from '../../utils/preSaveHashHook.js'
import generateAuthToken from '../../utils/generateAuthToken.js'
import applyToJSON from '../../utils/applyToJSON.js'

const PatientSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true ,
    minlength: 3 
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
    validate: {
      validator: validatePasswordComplexity,
      message: () => mongoosePasswordValidator(this.password).message
    } 
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
  role: {type: String, required: true, default: 'patient'},
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

preSaveHashHook(PatientSchema)

generateAuthToken(PatientSchema)

applyToJSON(PatientSchema)

export default mongoose.model('Patient', PatientSchema)