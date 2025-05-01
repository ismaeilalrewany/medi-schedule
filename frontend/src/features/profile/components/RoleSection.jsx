const RoleSection = ({ isAdmin, isViewerAdmin, currentUser, openModal }) => (
  <section className="profile-section mb-8 role-section">
    <h3 className="text-lg font-semibold text-neutral/90 mb-1">User Role</h3>
    <p className="section-description text-sm text-neutral/70 mb-4">Configure the user role within the system.</p>
    <div className="profile-items-wrapper border border-neutral/20 rounded-md overflow-hidden bg-base-100">
      <div
        id="role-change-item"
        className={`profile-item block relative p-4 border-b border-neutral/20 last:border-b-0 pr-10 ${!isAdmin && isViewerAdmin ? 'cursor-pointer hover:bg-neutral/5 transition-colors duration-150' : 'opacity-60 cursor-default'}`}
        onClick={() => !isAdmin && isViewerAdmin ? openModal('role', { role: currentUser.role }) : null}
      >
        <h5 className={`item-label font-semibold text-sm ${!isAdmin && isViewerAdmin ? 'text-neutral' : 'text-neutral/60'}`}>Change Role</h5>
        <i className={`fa-solid fa-chevron-right item-chevron absolute top-1/2 right-4 -translate-y-1/2 ${!isAdmin && isViewerAdmin ? 'text-neutral/40' : 'text-neutral/30'}`}></i>
      </div>
    </div>
  </section>
)

export default RoleSection