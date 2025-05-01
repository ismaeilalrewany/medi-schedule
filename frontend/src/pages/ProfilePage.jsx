import PersonalDetailsSection from '../features/profile/components/PersonalDetailsSection.jsx'
import ContactInfoSection from '../features/profile/components/ContactInfoSection.jsx'
import PasswordSecuritySection from '../features/profile/components/PasswordSecuritySection.jsx'
import RoleSection from '../features/profile/components/RoleSection.jsx'
import AccountManagementSection from '../features/profile/components/AccountManagementSection.jsx'
import Modals from '../features/profile/components/Modals.jsx'
import AvailableTimeSection from '../features/profile/components/AvilableTimeSection.jsx'
import useProfileData from '../features/profile/hooks/useProfileData'
import useProfileModals from '../features/profile/hooks/useProfileModals'
import { getInitialModalValue } from '../features/profile/utils/profileUtils'

const ProfilePage = ({ endpoint, isViewerAdmin = false }) => {
  const {
    currentUser,
    setCurrentUser,
    isAdmin,
    isDoctor,
    isPatient
  } = useProfileData(endpoint)

  const {
    activeModal,
    modalFormData,
    openModal,
    closeModal,
    handleModalInputChange,
    handleGenderChangeInModal,
    handleRoleChangeInModal,
    handleQualificationsChange,
    handleTimeSlotsChange,
    handleSaveChanges,
    handleDeleteAccount
  } = useProfileModals(currentUser, setCurrentUser)

  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-8">
      <div className="container mx-auto px-2">
        <article className="profile max-w-xl mx-auto ring-1 ring-neutral-300 bg-base-100 text-neutral p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6 text-neutral">Profile Settings</h2>

          <PersonalDetailsSection
            currentUser={currentUser}
            isPatient={isPatient}
            isDoctor={isDoctor}
            openModal={openModal}
            getInitialModalValue={field => getInitialModalValue(field, currentUser)}
          />

          <ContactInfoSection
            currentUser={currentUser}
            openModal={openModal}
            getInitialModalValue={field => getInitialModalValue(field, currentUser)}
          />

          <AvailableTimeSection
            currentUser={currentUser}
            isDoctor={isDoctor}
            openModal={openModal}
          />

          <PasswordSecuritySection openModal={openModal} />

          <RoleSection
            isAdmin={isAdmin}
            isViewerAdmin={isViewerAdmin}
            currentUser={currentUser}
            openModal={openModal}
          />

          <AccountManagementSection
            isAdmin={isAdmin}
            openModal={openModal}
          />
        </article>
      </div>
    </main>
    <Modals
      activeModal={activeModal}
      closeModal={closeModal}
      handleSaveChanges={handleSaveChanges}
      handleModalInputChange={handleModalInputChange}
      handleGenderChangeInModal={handleGenderChangeInModal}
      handleRoleChangeInModal={handleRoleChangeInModal}
      handleQualificationsChange={handleQualificationsChange}
      handleTimeSlotsChange={handleTimeSlotsChange}
      handleDeleteAccount={handleDeleteAccount}
      modalFormData={modalFormData}
    />
    </>
  )
}

export default ProfilePage