import { useState } from 'react'

const TelInput = ({ value, setValue, placeholder }) => {
  const [error, setError] = useState('')
  const phoneRegex = /^\+?(\d[\s-]*){9,}$/

  const handleChange = e => {
    const inputValue = e.target.value.trim()

    // Validation logic
    if (inputValue === '') {
      setError('Phone number is required')
    } else if (!phoneRegex.test(inputValue)) {
      setError('Invalid phone number')
    } else {
      setError('')
    }

    setValue(inputValue)
  }

  return (
    <div className="form-control">
      <label className="label block mb-2" htmlFor="phone">
        <span className="label-text font-bold">Phone Number</span>
      </label>
      <input
        id="phone"
        type="tel"
        placeholder={placeholder}
        className={`input input-bordered ${error ? 'input-error focus:ring-error!' : ''}`}
        value={value}
        onChange={handleChange}
        required
      />
      {error && <div className="mt-1 text-sm text-error">{error}</div>}
    </div>
  )
}

export default TelInput
