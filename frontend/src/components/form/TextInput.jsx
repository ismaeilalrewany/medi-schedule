const TextInput = ({ label, value, setValue, placeholder }) => {
  return (
    <div className="form-control">
      <label className="label mb-2 block" htmlFor="name">
        <span className="label-text font-bold">{label}</span>
      </label>
      <input
        id="name"
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