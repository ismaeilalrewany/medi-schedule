import { useState } from 'react'

const DateInput = ({ label, value, setValue }) => {
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const inputValue = e.target.value
    const selectedDate = new Date(inputValue)
    const today = new Date()
    
    // Validation logic
    if (!inputValue) {
      setError('Date is required')
    } else if (selectedDate > today) {
      setError('Date cannot be in the future')
    } else {
      setError('')
    }

    setValue(inputValue)
  }

  return (
    <div className="form-control">
      <label className="label block mb-2" htmlFor="date">
        <span className="label-text font-bold">{label}</span>
      </label>
      <input
        id="date"
        type="date"
        className={`input input-bordered ${error ? 'input-error focus:ring-error!' : ''}`}
        value={value}
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

export default DateInput