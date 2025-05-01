const AvailableTimeSection = ({ isDoctor, currentUser, openModal }) => (
  isDoctor && (
    <section className="profile-section mb-8">
      <h3 className="text-lg font-semibold text-neutral/90 mb-1">Available Time</h3>
      <p className="section-description text-sm text-neutral/70 mb-4">Manage your available time slots for appointments.</p>
      <div className="profile-items-wrapper border border-neutral/20 rounded-md overflow-hidden bg-base-100">
        <div
          className="profile-item block relative p-4 border-b border-neutral/20 last:border-b-0 hover:bg-neutral/5 transition-colors duration-150 cursor-pointer pr-10"
          onClick={() => openModal('availableTimeSlots', { availableTimeSlots: (currentUser.availableTimeSlots || []) })}
        >
          <h5 className="item-label font-semibold text-neutral mb-1 text-sm">Change Available Time Slots</h5>
          <span className="item-value text-sm text-neutral/80 block break-words" id="display-availableTimeSlots"></span>
          <i className="fa-solid fa-chevron-right item-chevron absolute top-1/2 right-4 -translate-y-1/2 text-neutral/40"></i>
        </div>
      </div>
    </section>
  )
)

export default AvailableTimeSection
