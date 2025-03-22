const RadioInput = ({ name, options, checked, setChecked }) => {
  return (
    <div className="form-control">
      <label htmlFor="role" className="label block mb-2">
        <span className="label-text font-bold">{ name }</span>
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
              id="role"
              type="radio"
              name="role"
              value={r.toLowerCase()}
              checked={checked === r.toLowerCase()}
              onChange={() => setChecked(r.toLowerCase())}
              className="hidden"
              default="patient"
            />
            {r}
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioInput