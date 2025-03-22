const DateInput = ({ label, value, setValue }) => {
  return (
    <div className="form-control">
      <label className="label mb-2 block" htmlFor="date">
        <span className="label-text font-bold">{label}</span>
      </label>
      <input
        id="date"
        type="date"
        className="input input-bordered"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  )
}

export default DateInput