const EmailInput = ({ email, setEmail }) => (
  <div className="form-control">
    <label className="label mb-2 block" htmlFor="email">
      <span className="label-text font-bold">Email</span>
    </label>
    <input
      id="email"
      type="email"
      placeholder="Enter your email"
      className="input input-bordered focus:input-neutral focus:ring-0 focus:outline-0"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
)

export default EmailInput