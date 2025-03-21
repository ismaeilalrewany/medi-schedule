const PasswordInput = ({ password, setPassword }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-semibold">Password</span>
    </label>
    <input
      type="password"
      placeholder="Enter your password"
      className="input input-bordered focus:input-success focus:ring-0"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>
)

export default PasswordInput