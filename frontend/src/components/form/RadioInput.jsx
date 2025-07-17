import { useState, useEffect } from 'react'

const RadioInput = ({ name, options, checked, setChecked }) => {
  const [error, setError] = useState('')

  useEffect(() => {
    // Validate when checked value changes
    if (!checked) {
      setError('Please select an option')
    } else {
      setError('')
    }
  }, [checked])

  const handleChange = (value) => {
    setChecked(value)
    if (!value) {
      setError('Please select an option')
    } else {
      setError('')
    }
  }

  return (
    <div className="form-control">
      <label className="label block mb-2">
        <span className="label-text font-bold">{name}</span>
      </label>
      <div className="w-full">
        {options.map((r) => (
          <label
            key={`${r.toLowerCase()}`}
            className={`me-2 btn no-animation ${
              checked === r.toLowerCase() ? 'btn-neutral' : 'btn-outline'
            }`}
          >
            <input
              type="radio"
              name={name.toLowerCase()}
              value={r.toLowerCase()}
              checked={checked === r.toLowerCase()}
              onChange={() => handleChange(r.toLowerCase())}
              className="hidden"
            />
            {r}
          </label>
        ))}
      </div>
      {error && (
        <div className="mt-1 text-sm text-error">
          {error}
        </div>
      )}
    </div>
  )
}

export default RadioInput