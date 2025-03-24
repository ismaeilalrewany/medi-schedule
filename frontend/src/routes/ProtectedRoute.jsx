import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const baseURL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          setIsAuthenticated(false)
          return
        }

        await axios.get(`${baseURL}/api/check-auth`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })
        setIsAuthenticated(true)
      } catch (error) {
        console.log("Error checking authentication:", error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [baseURL])

  if (isAuthenticated === null) {
    // Show loading state while checking authentication
    return <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute