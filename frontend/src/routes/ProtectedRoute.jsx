import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function ProtectedRoute({ role }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: null,
    userRole: null,
  })
  const baseURL = import.meta.env.VITE_API_URL
  const location = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setAuthState({ isAuthenticated: false, userRole: null })
          return
        }

        const response = await axios.get(`${baseURL}/api/check-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })

        const userRole = response.data.role
        setAuthState({
          isAuthenticated: true,
          userRole,
        })
      } catch (error) {
        console.log('Error checking authentication:', error)
        setAuthState({ isAuthenticated: false, userRole: null })
      }
    }

    checkAuth()
  }, [baseURL, role])

  if (authState.isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (authState.userRole !== role) {
    return <Navigate to={'/'} replace />
  }

  return <Outlet />
}

export default ProtectedRoute