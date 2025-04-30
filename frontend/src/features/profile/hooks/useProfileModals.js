import { useState } from 'react'

const useProfileModals = (currentUser, setCurrentUser) => {
  const [activeModal, setActiveModal] = useState(null)
  const [modalFormData, setModalFormData] = useState({})

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
    setCurrentUser(prevUser => {
      let updatedUser = { ...prevUser }
      switch (activeModal) {
        case 'fullName':
          updatedUser.fullName = modalFormData.fullName
          break
        case 'dateOfBirth':
          updatedUser.dateOfBirth = modalFormData.dateOfBirth
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
      }
      return updatedUser
    })
    closeModal()
  }

  const handleDeleteAccount = () => {
    return true
  }

  return {
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
  }
}

export default useProfileModals
