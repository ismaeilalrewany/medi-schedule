import mongoose from 'mongoose'
import validator from 'validator'

import {
  validatePasswordComplexity,
  mongoosePasswordValidator,
} from '../../utils/passwordComplexity.js'
import preSaveHashHook from '../../utils/preSaveHashHook.js'
import generateAuthToken from '../../utils/generateAuthToken.js'
import applyToJSON from '../../utils/applyToJSON.js'

const DoctorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Invalid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: validatePasswordComplexity,
        message: () => mongoosePasswordValidator(this.message).message,
      },
    },
    specialization: { type: String, required: true, trim: true },
    qualifications: [{ type: String, trim: true }],
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isMobilePhone, 'Invalid phone number'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
      lowercase: true,
    },
    role: { type: String, required: true, default: 'doctor' },
    availableTimeSlots: [
      {
        day: {
          type: String,
          enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
          lowercase: true,
        },
        startTime: { type: String },
        endTime: { type: String },
        isAvailable: { type: Boolean, default: true },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
)

preSaveHashHook(DoctorSchema)

generateAuthToken(DoctorSchema)

applyToJSON(DoctorSchema)

export default mongoose.model('Doctor', DoctorSchema)
