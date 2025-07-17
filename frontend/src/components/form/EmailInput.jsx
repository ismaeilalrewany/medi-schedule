import { useState } from 'react'

const EmailInput = ({ email, setEmail }) => {
  const [error, setError] = useState('')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleChange = (e) => {
    const inputValue = e.target.value.trim().toLowerCase()
    
    // Validation logic
    if (inputValue === '') {
      setError('Email is required')
    } else if (!emailRegex.test(inputValue)) {
      setError('Invalid email address')
    } else {
      setError('')
    }

    setEmail(inputValue)
  }

  return (
    <div className="form-control">
      <label className="label block mb-2" htmlFor="email">
        <span className="label-text font-bold">Email</span>
      </label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        className={`input input-bordered ${error ? 'input-error focus:ring-error!' : ''}`}
        value={email}
        onChange={handleChange}
        required
      />
      {error && (
        <div className="mt-1 text-sm text-error">
          {error}
        </div>
      )}
    </div>
  )
}

export default EmailInput