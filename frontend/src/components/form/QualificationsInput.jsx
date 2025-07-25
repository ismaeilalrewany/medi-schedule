import { useState } from 'react'

const QualificationsInput = ({ qualifications, setQualifications }) => {
  const [input, setInput] = useState('')

  const handleAdd = e => {
    e.preventDefault()
    if (input.trim()) {
      setQualifications([...qualifications, input.trim()])
      setInput('')
    }
  }

  return (
    <div className="form-control">
      <label className="label block mb-2" htmlFor="qualifications">
        <span className="label-text font-bold">Qualifications</span>
      </label>
      <div className="flex gap-2">
        <input
          id="qualifications"
          type="text"
          placeholder="Add qualification"
          className="input input-bordered flex-1"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="btn btn-outline" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {qualifications.map((q, index) => (
          <div key={index} className="badge badge-neutral badge-lg gap-2 px-2">
            <span className="pointer-events-none">{q}</span>
            <button
              type="button"
              onClick={() => setQualifications(qualifications.filter((_, i) => i !== index))}
              className="text-lg cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QualificationsInput
