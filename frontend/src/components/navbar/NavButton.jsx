import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const NavButton = ({ authButton, path }) => {
  const navigate = useNavigate()
  const route = path?.split('/')[1]
  const baseURL = import.meta.env.VITE_API_URL

  const handleLogout = async () => {
    await logout(baseURL, route, navigate)
  }

  return (
    <>
      {authButton?.pathname !== '/logout' ? (
        <Link to={authButton?.pathname || '/'} className="btn">
          {authButton?.linkText || 'Button'}
        </Link>
      ) : (
        <button
          type='button'
          onClick={handleLogout}
          className="btn">Logout</button>
      )}
    </>
  )
}

const logout = async (baseURL, route, navigate) => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      localStorage.removeItem('token')
    }

    await axios.post(`${baseURL}/api/${route}/logout`, {}, {
      headers: {
      Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })

    navigate('/login')
  } catch (err) {
    console.error('Logout error:', err.response?.data || err)
    if (err.response?.status === 401) {
      navigate('/login')
    }
  }
}

export default NavButton