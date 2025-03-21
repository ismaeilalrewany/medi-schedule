import validator from 'validator'

export const validatePasswordComplexity = (password) => {
  // Check basic requirements
  const meetsLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

  // Create error messages array
  const errors = [];
  if (!meetsLength) errors.push('be at least 8 characters long')
  if (!hasUppercase) errors.push('contain at least one uppercase letter')
  if (!hasLowercase) errors.push('contain at least one lowercase letter')
  if (!hasNumber) errors.push('contain at least one number')
  if (!hasSpecialChar) errors.push('contain at least one special character')

  return {
    isValid: errors.length === 0,
    message: errors.length > 0 
      ? `Password must ${errors.join(', ')}`
      : 'Password is valid'
  }
}

// Mongoose-specific validator wrapper
export const mongoosePasswordValidator = (value) => {
  const { isValid } = validatePasswordComplexity(value)
  return isValid
}