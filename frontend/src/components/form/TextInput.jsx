import { useState } from 'react'

const TextInput = ({ label, value, setValue, placeholder }) => {
  const [error, setError] = useState('')

  const handleChange = e => {
    const inputValue = e.target.value

    // Validation logic
    if (!/^[A-Za-z\s.]*$/.test(inputValue)) {
      setError('Invalid full name. Only letters, spaces, and periods are allowed.')
    } else if (inputValue.trim().length < 3) {
      setError('Full name must be at least 3 characters long.')
    } else {
      setError('')
    }

    setValue(inputValue)
  }

  return (
    <div className="form-control">
      <label className="label block mb-2" htmlFor={label.toLowerCase()}>
        <span className="label-text font-bold">{label}</span>
      </label>
      <input
        id={label.toLowerCase()}
        type="text"
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

export default TextInput
