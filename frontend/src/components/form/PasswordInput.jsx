import { useState } from 'react'

const PasswordInput = ({ password, setPassword }) => {
  const [error, setError] = useState('')

  const validatePassword = (value) => {
    const errors = []

    if (value.length < 8) {
      errors.push('be at least 8 characters long')
    }
    if (!/[A-Z]/.test(value)) {
      errors.push('contain at least one uppercase letter')
    }
    if (!/[a-z]/.test(value)) {
      errors.push('contain at least one lowercase letter')
    }
    if (!/\d/.test(value)) {
      errors.push('contain at least one number')
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      errors.push('contain at least one special character')
    }

    return errors
  }

  const handleChange = (e) => {
    const inputValue = e.target.value
    const errors = validatePassword(inputValue)

    if (errors.length > 0) {
      setError(`Password must ${errors.join(', ')}`)
    } else {
      setError('')
    }

    setPassword(inputValue)
  }

  return (
    <div className="form-control">
      <label htmlFor="password" className="label block mb-2">
        <span className="label-text font-bold">Password</span>
      </label>
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        className={`input input-bordered ${error ? 'input-error focus:ring-error!' : ''}`}
        value={password}
        onChange={handleChange}
        required
      />
      {error && (
        <div className="mt-1 text-sm text-error max-w-76">
          {error}
        </div>
      )}
    </div>
  )
}

export default PasswordInput