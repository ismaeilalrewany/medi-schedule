import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavButton from './components/NavButton.jsx'
import checkAuth from '../../services/checkAuth.js'

const Navbar = () => {
  const location = useLocation()
  const { pathname } = location
  const [userId, setUserId] = useState('')
  const [userRole, setUserRole] = useState('')

  const authButtonController = () => {
    switch (pathname) {
      case '/':
        if (userRole) return {pathname: `/${userRole}s/logout`, linkText: 'Logout'}
        else return {pathname: '/login', linkText: 'Login'}
      case '/login':
        return { pathname: '/patients/register', linkText: 'Register' }
      case '/patients/register':
        return { pathname: '/login', linkText: 'Login' }
      case '/patients/appointments':
      case '/patients/profile':
      case '/doctors/appointments':
      case '/doctors/profile':
      case '/doctors/register':
      case '/admins/profile':
      case '/admins/dashboard':
      case `/admins/patients/${userId}`:
      case `/admins/doctors/${userId}`:
      case `/admins/patients/${userId}/appointments`:
      case `/admins/doctors/${userId}/appointments`:
        return { pathname: `/${userRole}s/logout`, linkText: 'Logout' }
      default:
        return {pathname: '/login', linkText: 'Login'}
    }
  }

  const authButton = authButtonController()

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const role = await checkAuth()

      if (role) {
        setUserRole(role)
      }
    }

    fetchAuthStatus()

    setUserId(location.pathname.split('/')[3] || '')
  }, [location])

  return (
    <header className="bg-base-100 shadow-sm">
      <div className="container mx-auto">
        <nav className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/patients/appointments" className="btn btn-ghost">Appointments</Link>
                </li>
              </ul>
            </div>
            <Link to={'/patients/appointments'} className="btn btn-ghost text-xl">MediSchedule</Link>
          </div>
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/" className="btn btn-ghost">Home</Link>
              </li>
              {userRole === 'admin' ? (
                <li>
                  <Link to="/admins/dashboard" className="btn btn-ghost">Dashboard</Link>
                </li>
              ) : (
                <li>
                  <Link to={`/${userRole || 'patient'}s/appointments`} className="btn btn-ghost">Appointments</Link>
                </li>
              )}
              <li>
                <Link to={`/${userRole || 'patient'}s/profile`} className="btn btn-ghost">Profile</Link>
              </li>
            </ul>
            <div className="">
              <NavButton authButton={authButton} />
            </div>
          </div>
          <div className="navbar-end lg:hidden">
            <NavButton authButton={authButton} />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar