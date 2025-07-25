import EditModal from '../../../components/modal/EditModal.jsx'
import ConfirmModal from '../../../components/modal/ConfirmModal.jsx'
import AvailableTimeSlotsEditor from './AvailableTimeSlotsEditor.jsx'

const Modals = ({
  activeModal,
  closeModal,
  handleSaveChanges,
  handleModalInputChange,
  handleGenderChangeInModal,
  handleRoleChangeInModal,
  handleQualificationsChange,
  handleTimeSlotsChange,
  handleDeleteAccount,
  modalFormData,
}) => {
  return (
    <>
      <EditModal
        isOpen={activeModal === 'fullName'}
        onClose={closeModal}
        title="Edit Full Name"
        onSave={handleSaveChanges}
      >
        <div className="form-group">
          <label
            htmlFor="modal-edit-fullname"
            className="block text-sm font-medium text-neutral/80 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="modal-edit-fullname"
            name="fullname"
            value={modalFormData.fullname || ''}
            onChange={handleModalInputChange}
            className="input input-bordered w-full bg-base-200/50 text-neutral"
            required
          />
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'dateOfBirth'}
        onClose={closeModal}
        title="Edit Date of Birth"
        onSave={handleSaveChanges}
      >
        <div className="form-group">
          <label
            htmlFor="modal-edit-dateOfBirth"
            className="block text-sm font-medium text-neutral/80 mb-1"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="modal-edit-dateOfBirth"
            name="dateOfBirth"
            value={modalFormData.dateOfBirth || ''}
            onChange={handleModalInputChange}
            className="input input-bordered w-full bg-base-200/50 text-neutral"
          />
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'gender'}
        onClose={closeModal}
        title="Edit Gender"
        onSave={handleSaveChanges}
      >
        <div className="form-group">
          <label className="block text-sm font-medium text-neutral/80 mb-2">Gender</label>
          <div className="flex gap-2">
            {['male', 'female'].map(genderOption => (
              <button
                key={genderOption}
                type="button"
                className={`btn grow ${modalFormData.gender === genderOption ? 'bg-neutral text-neutral-content border-0' : 'btn-outline text-neutral/80'}`}
                onClick={() => handleGenderChangeInModal(genderOption)}
              >
                {genderOption}
              </button>
            ))}
          </div>
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'medicalHistory'}
        onClose={closeModal}
        title="Edit Medical History"
        onSave={handleSaveChanges}
      >
        <div className="form-group">
          <label
            htmlFor="modal-edit-medical-medicalHistory"
            className="block text-sm font-medium text-neutral/80 mb-1"
          >
            Medical History
          </label>
          <textarea
            id="modal-edit-medical-medicalHistory"
            name="medical_history"
            value={modalFormData.medicalHistory || ''}
            onChange={handleModalInputChange}
            rows="5"
            className="textarea textarea-bordered w-full bg-base-200/50 text-neutral"
          ></textarea>
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'specialization'}
        onClose={closeModal}
        title="Edit Specialization"
        onSave={handleSaveChanges}
      >
        <div className="form-group">
          <label
            htmlFor="modal-edit-specialization"
            className="block text-sm font-medium text-neutral/80 mb-1"
          >
            Specialization
          </label>
          <input
            type="text"
            id="modal-edit-specialization"
            name="specialization"
            value={modalFormData.specialization || ''}
            onChange={handleModalInputChange}
            className="input input-bordered w-full bg-base-200/50 text-neutral"
            required
          />
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'qualifications'}
        onClose={closeModal}
        title="Edit Qualifications"
        onSave={handleSaveChanges}
      >
        <div className="form-group">
          <label
            htmlFor="modal-edit-qualifications"
            className="block text-sm font-medium text-neutral/80 mb-1"
          >
            Qualifications (comma separated)
          </label>
          <input
            type="text"
            id="modal-edit-qualifications"
            name="qualifications"
            value={modalFormData.qualifications || ''}
            onChange={handleQualificationsChange}
            className="input input-bordered w-full bg-base-200/50 text-neutral"
            placeholder="MBBS, MD, PhD"
          />
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'email'}
        onClose={closeModal}
        title="Edit Email"
        onSave={handleSaveChanges}
      >
        <div className="form-group">
          <label
            htmlFor="modal-edit-email"
            className="block text-sm font-medium text-neutral/80 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="modal-edit-email"
            name="email"
            value={modalFormData.email || ''}
            onChange={handleModalInputChange}
            className="input input-bordered w-full bg-base-200/50 text-neutral"
            required
          />
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'phoneNumber'}
        onClose={closeModal}
        title="Edit Phone Number"
        onSave={handleSaveChanges}
      >
        <div className="form-group">
          <label
            htmlFor="modal-edit-phoneNumber"
            className="block text-sm font-medium text-neutral/80 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="modal-edit-phoneNumber"
            name="phoneNumber"
            value={modalFormData.phoneNumber || ''}
            onChange={handleModalInputChange}
            className="input input-bordered w-full bg-base-200/50 text-neutral"
          />
        </div>
      </EditModal>

      {activeModal === 'availableTimeSlots' && (
        <dialog className="modal" open>
          <div className="modal-box text-neutral">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-neutral/70"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <i className="fa-solid fa-x"></i>
            </button>
            <h3 className="font-bold text-lg mb-4 text-center text-neutral">Edit Available Time</h3>
            <AvailableTimeSlotsEditor
              initialSlots={modalFormData.availableTimeSlots || []}
              onSave={slots => {
                handleTimeSlotsChange({ target: { name: 'availableTimeSlots', value: slots } })
                closeModal()
              }}
              onCancel={closeModal}
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>close</button>
          </form>
        </dialog>
      )}

      <EditModal
        isOpen={activeModal === 'password'}
        onClose={closeModal}
        title="Change Password"
        onSave={handleSaveChanges}
      >
        <div className="form-group mb-4">
          <label
            htmlFor="modal-current-password"
            className="block text-sm font-medium text-neutral/80 mb-1"
          >
            Current Password
          </label>
          <input
            type="password"
            id="modal-current-password"
            name="current_password"
            value={modalFormData.current_password || ''}
            onChange={handleModalInputChange}
            className="input input-bordered w-full bg-base-200/50 text-neutral"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label
            htmlFor="modal-new-password"
            className="block text-sm font-medium text-neutral/80 mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            id="modal-new-password"
            name="new_password"
            value={modalFormData.new_password || ''}
            onChange={handleModalInputChange}
            className="input input-bordered w-full bg-base-200/50 text-neutral"
            required
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="modal-confirm-password"
            className="block text-sm font-medium text-neutral/80 mb-1"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="modal-confirm-password"
            name="confirm_password"
            value={modalFormData.confirm_password || ''}
            onChange={handleModalInputChange}
            className="input input-bordered w-full bg-base-200/50 text-neutral"
            required
          />
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === 'role'}
        onClose={closeModal}
        title="Change User Role"
        onSave={handleSaveChanges}
      >
        <div className="form-group">
          <label htmlFor="select-role" className="block text-sm font-medium text-neutral/80 mb-1">
            Select New Role
          </label>
          <div className="flex gap-2">
            {['admin', 'doctor', 'patient'].map(roleOption => (
              <button
                key={roleOption}
                type="button"
                className={`btn grow ${modalFormData.role === roleOption ? 'bg-neutral text-neutral-content border-0' : 'btn-outline text-neutral/80'}`}
                onClick={() => handleRoleChangeInModal(roleOption)}
              >
                {roleOption.split(/(?=[A-Z])/).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </EditModal>

      <ConfirmModal
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        title="Delete Account"
        message="Are you sure you want to delete your account?"
        onConfirm={handleDeleteAccount}
      />
    </>
  )
}

export default Modals
