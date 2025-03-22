const PasswordInput = ({ password, setPassword }) => (
  <div className="form-control">
    <label htmlFor="password" className="label block mb-2">
      <span className="label-text font-bold">Password</span>
    </label>
    <input
      id="password"
      type="password"
      placeholder="Enter your password"
      className="input input-bordered"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>
)

export default PasswordInput