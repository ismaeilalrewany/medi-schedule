const RadioInput = ({ data }) => {
  return (
    <div className="form-control">
      <label htmlFor="role" className="label block mb-2">
        <span className="label-text font-bold">{ data.name }</span>
      </label>
      <div className="w-full">
        {data.options.map((r) => (
          <label
            key={`${r.toLowerCase()}`}
            className={`me-2 btn no-animation ${
              data.checked === r.toLowerCase() ? 'btn-neutral' : 'btn-outline hover:bg-inherit hover:border-neutral'
            }`}
          >
            <input
              id="role"
              type="radio"
              name="role"
              value={r.toLowerCase()}
              checked={data.checked === r.toLowerCase()}
              onChange={() => data.setChecked(r.toLowerCase())}
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