import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchUserData } from '../services/profileService'

const useProfileData = endpoint => {
  const [currentUser, setCurrentUser] = useState({})
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

  return {
    currentUser,
    setCurrentUser,
    currentUserRole,
    isAdmin,
    isDoctor,
    isPatient,
  }
}

export default useProfileData
