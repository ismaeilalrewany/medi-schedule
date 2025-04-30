import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PersonalDetailsSection from '../features/profile/components/PersonalDetailsSection.jsx'
import ContactInfoSection from '../features/profile/components/ContactInfoSection.jsx'
import PasswordSecuritySection from '../features/profile/components/PasswordSecuritySection.jsx'
import RoleSection from '../features/profile/components/RoleSection.jsx'
import AccountManagementSection from '../features/profile/components/AccountManagementSection.jsx'
import { fetchUserData } from '../features/profile/services/profileService'
import { getInitialModalValue } from '../features/profile/utils/profileUtils'
import Modals from '../features/profile/components/Modals.jsx'

const ProfilePage = ({ endpoint, isViewerAdmin = false }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [activeModal, setActiveModal] = useState(null)
  const [modalFormData, setModalFormData] = useState({})

  const baseURL = import.meta.env.VITE_API_URL
  const params = useParams()

  useEffect(() => {
    let resolvedEndpoint = endpoint
    if (endpoint.includes(':id') && params.id) {
      resolvedEndpoint = endpoint.replace(':id', params.id)
    }

    const apiUrl = `${baseURL}/api/${resolvedEndpoint}`

    const getUserData = async () => {
      try {
        const data = await fetchUserData(apiUrl)
        setCurrentUser(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    getUserData()
  }, [endpoint, params.id, baseURL])

  const currentUserRole = currentUser.role
  const isAdmin = currentUserRole === 'admin'
  const isDoctor = currentUserRole === 'doctor'
  const isPatient = currentUserRole === 'patient'

  const openModal = (modalType, initialData = {}) => {
    setModalFormData(initialData)
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
    setModalFormData({})
  }

  const handleModalInputChange = (event) => {
    const { name, value } = event.target
    setModalFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleGenderChangeInModal = (newGender) => {
    setModalFormData(prev => ({ ...prev, gender: newGender }))
  }

  const handleRoleChangeInModal = (newRole) => {
    setModalFormData(prev => ({ ...prev, role: newRole }))
  }

  const handleQualificationsChange = (event) => {
    setModalFormData(prev => ({
      ...prev,
      qualifications: event.target.value.split(',').map(q => q.trim())
    }))
  }

  const handleTimeSlotsChange = (event) => {
    setModalFormData(prev => ({
      ...prev,
      availableTimeSlots: event.target.value.split(',').map(t => t.trim())
    }))
  }

  const handleSaveChanges = () => {
    console.log("Saving changes for:", activeModal, modalFormData)

    setCurrentUser(prevUser => {
      let updatedUser = { ...prevUser }
      switch (activeModal) {
        case 'name':
          updatedUser.fullName = modalFormData.fullname
          break
        case 'dateOfBirth':
          if (modalFormData.dateOfBirth) {
            const parts = modalFormData.dateOfBirth.split('-')
            updatedUser.dateOfBirth = `${parts[2]}/${parts[1]}/${parts[0]}`
          }
          break
        case 'gender':
          updatedUser.gender = modalFormData.gender
          break
        case 'medicalHistory':
          updatedUser.medicalHistory = modalFormData.medical_history
          break
        case 'email':
          updatedUser.email = modalFormData.email
          break
        case 'phoneNumber':
          updatedUser.phoneNumber = modalFormData.phoneNumber
          break
        case 'role':
          updatedUser.role = modalFormData.role
          break
        case 'specialization':
          updatedUser.specialization = modalFormData.specialization
          break
        case 'qualifications':
          updatedUser.qualifications = modalFormData.qualifications
          break
        case 'availableTimeSlots':
          updatedUser.availableTimeSlots = modalFormData.availableTimeSlots
          break
        case 'delete':
          updatedUser = {
            fullName: '',
            dateOfBirth: '',
            gender: '',
            medicalHistory: '',
            email: '',
            phoneNumber: '',
            role: '',
            specialization: '',
            qualifications: [],
            availableTimeSlots: [],
          }
          break
        default:
          break
      }
      return updatedUser
    })

    closeModal()
  }

  const handleDeleteAccount = () => {
    return true
  }

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