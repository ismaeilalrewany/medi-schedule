export const validatePasswordComplexity = password => {
  const errors = getValidationErrors(password)
  return {
    isValid: errors.length === 0,
    message: errors.length > 0 ? `Password must ${errors.join(', ')}` : 'Password is valid',
  }
}

const getValidationErrors = password => {
  const errors = []
  if (!meetsLength(password)) errors.push('be at least 8 characters long')
  if (!hasUppercase(password)) errors.push('contain at least one uppercase letter')
  if (!hasLowercase(password)) errors.push('contain at least one lowercase letter')
  if (!hasNumber(password)) errors.push('contain at least one number')
  if (!hasSpecialChar(password)) errors.push('contain at least one special character')
  return errors
}

const meetsLength = password => password.length >= 8
const hasUppercase = password => /[A-Z]/.test(password)
const hasLowercase = password => /[a-z]/.test(password)
const hasNumber = password => /\d/.test(password)
const hasSpecialChar = password => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

// Mongoose-specific validator wrapper
export const mongoosePasswordValidator = value => {
  const { isValid } = validatePasswordComplexity(value)
  return isValid
}
