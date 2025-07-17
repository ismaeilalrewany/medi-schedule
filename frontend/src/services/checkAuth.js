import axios from 'axios'

const isAuthenticated = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/check-auth`, {withCredentials: true})

    if (response.data.message === 'Authenticated') {
      return response.data.role
    }
  } catch (error) {
    // console.error('Error checking authentication:', error.message)
    return null
  }
}

export default isAuthenticated