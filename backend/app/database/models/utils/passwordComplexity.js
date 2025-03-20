const passwordComplexity = {
  validator: function(value) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
  },
  message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
}

export default passwordComplexity