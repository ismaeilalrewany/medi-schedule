import mongoose from 'mongoose'
import validator from 'validator'
import passwordComplexity from './utils/passwordComplexity.js'
import preSaveHook from './utils/preSaveHook.js'
import generateAuthToken from './utils/generateAuthToken.js'
import applyToJSON from './utils/applyToJSON.js'

const AdminSchema = new mongoose.Schema({
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
    trim: true, 
    validate: [validator.isMobilePhone, 'Invalid phone number'] 
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true })

preSaveHook(AdminSchema)

generateAuthToken(AdminSchema)

applyToJSON(AdminSchema)

export default mongoose.model('Admin', AdminSchema)