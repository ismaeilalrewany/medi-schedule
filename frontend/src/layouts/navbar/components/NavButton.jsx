import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const NavButton = ({ authButton }) => {
  const navigate = useNavigate()
  const baseURL = import.meta.env.VITE_API_URL

  const handleLogout = async () => {
    await logout(baseURL, authButton.pathname, navigate)
  }

  return (
    <>
      {!authButton.pathname.includes('logout') ? (
        <Link to={authButton?.pathname || '/'} className="btn">
          {authButton?.linkText || 'Button'}
        </Link>
      ) : (
        <button type="button" onClick={handleLogout} className="btn">
          Logout
        </button>
      )}
    </>
  )
}

const logout = async (baseURL, endpoint, navigate) => {
  try {
    await axios.post(
      `${baseURL}/api${endpoint}`,
      {},
      {
        withCredentials: true,
      }
    )

    navigate('/login')
  } catch (err) {
    console.error('Logout error:', err.response?.data || err)
    if (err.response?.status === 401) {
      navigate('/login')
    }
  }
}

export default NavButton
