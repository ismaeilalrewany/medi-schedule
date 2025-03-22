const TextareaInput = ({ label, value, setValue, placeholder }) => {
  return (
    <div className="form-control">
      <label className="label mb-2 block" htmlFor="message">
        <span className="label-text font-bold">{label}</span>
      </label>
      <textarea
        id="message"
        placeholder={placeholder}
        className="textarea textarea-bordered h-24"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  )
}

export default TextareaInput