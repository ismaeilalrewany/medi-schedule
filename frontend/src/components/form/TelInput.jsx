const TelInput = ({ value, setValue, placeholder }) => {
  return (
    <div className="form-control">
      <label className="label mb-2 block" htmlFor="phone">
        <span className="label-text font-bold">Phone Number</span>
      </label>
      <input
        id="phone"
        type="tel"
        placeholder={placeholder}
        className="input input-bordered"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  )
}

export default TelInput