import mongoose from 'mongoose'
import validator from 'validator'

import { mongoosePasswordValidator, validatePasswordComplexity } from '../../utils/passwordComplexity.js'
import preSaveHashHook from '../../utils/preSaveHashHook.js'
import generateAuthToken from '../../utils/generateAuthToken.js'
import applyToJSON from '../../utils/applyToJSON.js'
import 'dotenv/config'

const AdminSchema = new mongoose.Schema({
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
      validator: mongoosePasswordValidator,
      message: () => validatePasswordComplexity(this.password).message
    }
  },
  phoneNumber: {
    type: String,
    trim: true,
    validate: [validator.isMobilePhone, 'Invalid phone number']
  },
  role: {type: String, required: true, default: 'admin'},
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true })

preSaveHashHook(AdminSchema)

generateAuthToken(AdminSchema)

applyToJSON(AdminSchema)

// Create admin because there is no admin register api
AdminSchema.statics.createDefaultAdmin = async function() {
  try {
    const existingAdmin = await this.findOne({ email: process.env.ADMIN_EMAIL })

    if (existingAdmin) {
      console.log('Default admin already exists')
      return
    }

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be provided in environment variables')
    }

    const admin = new this({
      fullName: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD ,
      phoneNumber: process.env.ADMIN_PHONE
    })

    const complexityCheck = validatePasswordComplexity(admin.password)
    if (!complexityCheck.isValid) {
      throw new Error(complexityCheck.message)
    }

    await admin.save()
    console.log('Default admin created successfully')
  } catch (error) {
    console.error('Error creating default admin:', error.message)
    process.exit(1)
  }
}

export default mongoose.model('Admin', AdminSchema)
