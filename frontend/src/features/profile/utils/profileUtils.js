export function getInitialModalValue(field, currentUser) {
  let parts
  switch (field) {
    case 'fullname': return currentUser.fullName
    case 'dateOfBirth':
      parts = currentUser.dateOfBirth?.split('/')
      return (parts && parts.length === 3) ? `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}` : ''
    case 'gender': return currentUser.gender
    case 'medical_history': return currentUser.medicalHistory
    case 'email': return currentUser.email
    case 'phoneNumber': return currentUser.phoneNumber
    case 'specialization': return currentUser.specialization
    case 'qualifications': return currentUser.qualifications
    case 'availableTimeSlots': return currentUser.availableTimeSlots
    default: return ''
  }
}
