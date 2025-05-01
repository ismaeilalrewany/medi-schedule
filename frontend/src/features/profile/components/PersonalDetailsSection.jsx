const PersonalDetailsSection = ({ currentUser, isPatient, isDoctor, openModal, getInitialModalValue }) => (
  <section className="profile-section mb-8">
    <h3 className="text-lg font-semibold text-neutral/90 mb-1">Personal Details</h3>
    <p className="section-description text-sm text-neutral/70 mb-4">Manage your name and other personal data.</p>
    <div className="profile-items-wrapper border border-neutral/20 rounded-md overflow-hidden bg-base-100">
      <div
        className="profile-item block relative p-4 border-b border-neutral/20 last:border-b-0 hover:bg-neutral/5 transition-colors duration-150 cursor-pointer pr-10"
        onClick={() => openModal('fullName', { fullname: getInitialModalValue('fullName') })}
      >
        <h5 className="item-label font-semibold text-neutral mb-1 text-sm">Full Name</h5>
        <span className="item-value text-sm text-neutral/80 block break-words" id="display-name">
          {currentUser.fullName}
        </span>
        <i className="fa-solid fa-chevron-right item-chevron absolute top-1/2 right-4 -translate-y-1/2 text-neutral/40"></i>
      </div>
      {isPatient && (
        <div
          className="profile-item block relative p-4 border-b border-neutral/20 last:border-b-0 hover:bg-neutral/5 transition-colors duration-150 cursor-pointer pr-10"
          onClick={() => openModal('dateOfBirth', { dateOfBirth: getInitialModalValue('dateOfBirth') })}
        >
          <h5 className="item-label font-semibold text-neutral mb-1 text-sm">Date of Birth</h5>
          <span className="item-value text-sm text-neutral/80 block break-words" id="display-dateOfBirth">
            {currentUser.dateOfBirth}
          </span>
          <i className="fa-solid fa-chevron-right item-chevron absolute top-1/2 right-4 -translate-y-1/2 text-neutral/40"></i>
        </div>
      )}
      {(isPatient || isDoctor) && (
        <div
          className="profile-item block relative p-4 border-b border-neutral/20 last:border-b-0 hover:bg-neutral/5 transition-colors duration-150 cursor-pointer pr-10"
          onClick={() => openModal('gender', { gender: getInitialModalValue('gender') })}
        >
          <h5 className="item-label font-semibold text-neutral mb-1 text-sm">Gender</h5>
          <span className="item-value text-sm text-neutral/80 block break-words" id="display-gender">
            {currentUser.gender}
          </span>
          <i className="fa-solid fa-chevron-right item-chevron absolute top-1/2 right-4 -translate-y-1/2 text-neutral/40"></i>
        </div>
      )}
      {isPatient && (
        <div
          className="profile-item block relative p-4 border-b border-neutral/20 last:border-b-0 hover:bg-neutral/5 transition-colors duration-150 cursor-pointer pr-10"
          onClick={() => openModal('medicalHistory', { medicalHistory: getInitialModalValue('medicalHistory') })}
        >
          <h5 className="item-label font-semibold text-neutral mb-1 text-sm">Medical History</h5>
          <span className="item-value text-sm text-neutral/80 block break-words item-value-truncated" id="display-medicalHistory">
            {currentUser.medicalHistory}
          </span>
          <i className="fa-solid fa-chevron-right item-chevron absolute top-1/2 right-4 -translate-y-1/2 text-neutral/40"></i>
        </div>
      )}
      {isDoctor && (
        <>
          <div
            className="profile-item block relative p-4 border-b border-neutral/20 last:border-b-0 hover:bg-neutral/5 transition-colors duration-150 cursor-pointer pr-10"
            onClick={() => openModal('specialization', { specialization: getInitialModalValue('specialization') })}
          >
            <h5 className="item-label font-semibold text-neutral mb-1 text-sm">Specialization</h5>
            <span className="item-value text-sm text-neutral/80 block break-words" id="display-specialization">
              {currentUser.specialization}
            </span>
            <i className="fa-solid fa-chevron-right item-chevron absolute top-1/2 right-4 -translate-y-1/2 text-neutral/40"></i>
          </div>
          <div
            className="profile-item block relative p-4 border-b border-neutral/20 last:border-b-0 hover:bg-neutral/5 transition-colors duration-150 cursor-pointer pr-10"
            onClick={() => openModal('qualifications', { qualifications: (currentUser.qualifications || []).join(', ') })}
          >
            <h5 className="item-label font-semibold text-neutral mb-1 text-sm">Qualifications</h5>
            <span className="item-value text-sm text-neutral/80 block break-words" id="display-qualifications">
              {(currentUser.qualifications || []).join(', ')}
            </span>
            <i className="fa-solid fa-chevron-right item-chevron absolute top-1/2 right-4 -translate-y-1/2 text-neutral/40"></i>
          </div>
        </>
      )}
    </div>
  </section>
)

export default PersonalDetailsSection