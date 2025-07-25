const PasswordSecuritySection = ({ openModal }) => (
  <section className="profile-section mb-8">
    <h3 className="text-lg font-semibold text-neutral/90 mb-1">Password & Security</h3>
    <p className="section-description text-sm text-neutral/70 mb-4">
      Update your password and manage account security settings.
    </p>
    <div className="profile-items-wrapper border border-neutral/20 rounded-md overflow-hidden bg-base-100">
      <div
        className="profile-item block relative p-4 border-b border-neutral/20 last:border-b-0 hover:bg-neutral/5 transition-colors duration-150 cursor-pointer pr-10"
        onClick={() => openModal('password')}
      >
        <h5 className="item-label font-semibold text-neutral text-sm">Change Password</h5>
        <i className="fa-solid fa-chevron-right item-chevron absolute top-1/2 right-4 -translate-y-1/2 text-neutral/40"></i>
      </div>
    </div>
  </section>
)

export default PasswordSecuritySection
