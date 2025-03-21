const RadioInput = ({ role, setRole }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-semibold">Select Role</span>
    </label>
    <div className="join w-full">
      {['Admin', 'Doctor', 'Patient'].map((r) => (
        <label
          key={r.toLowerCase()}
          className={`join-item btn btn-outline no-animation ${
            role === r.toLowerCase() ? 'btn-[--color-neutral]' : ''
          }`}
        >
          <input
            type="radio"
            name="role"
            value={r.toLowerCase()}
            checked={role === r.toLowerCase()}
            onChange={() => setRole(r.toLowerCase())}
            className="hidden"
          />
          {r}
        </label>
      ))}
    </div>
  </div>
)

export default RadioInput