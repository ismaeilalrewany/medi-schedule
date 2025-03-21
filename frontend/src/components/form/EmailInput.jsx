const EmailInput = ({ email, setEmail }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-semibold">Email</span>
    </label>
    <input
      type="email"
      placeholder="Enter your email"
      className="input input-bordered focus:input-success focus:ring-0"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
)

export default EmailInput