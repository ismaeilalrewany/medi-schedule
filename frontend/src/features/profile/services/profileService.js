import axios from 'axios'

export async function fetchUserData(apiUrl) {
  const response = await axios.get(apiUrl, { withCredentials: true })
  if (!response.data) {
    throw new Error('No data returned from API')
  }
  return response.data
}
