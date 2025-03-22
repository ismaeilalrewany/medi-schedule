const TextInput = ({ label, value, setValue, placeholder }) => {
  return (
    <div className="form-control">
      <label className="label mb-2 block" htmlFor={`${label.toLowerCase()}`}>
        <span className="label-text font-bold">{label}</span>
      </label>
      <input
        id={`${label.toLowerCase()}`}
        type="text"
        placeholder={placeholder}
        className="input input-bordered"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  )
}

export default TextInput