import { Link } from 'react-router-dom'

const NavLinks = userRole => {
  const role = userRole.role || 'patient'

  return (
    <>
      <li>
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>
      </li>
      {role === 'admin' ? (
        <li>
          <Link to="/admins/dashboard" className="btn btn-ghost">
            Dashboard
          </Link>
        </li>
      ) : (
        <li>
          <Link to={`/${role || 'patient'}s/appointments`} className="btn btn-ghost">
            Appointments
          </Link>
        </li>
      )}
      <li>
        <Link to={`/${role || 'patient'}s/profile`} className="btn btn-ghost">
          Profile
        </Link>
      </li>
    </>
  )
}

export default NavLinks
