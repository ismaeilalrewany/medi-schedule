import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Table = ({ name }) => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/${name}s`, {
          withCredentials: true,
        })
        setUsers(response.data)
        setLoading(false)
      } catch (error) {
        console.error(`Error fetching ${name}s:`, error)
        setError(`Failed to fetch ${name}s`)
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-lg ring-1 ring-neutral-300 bg-base-100">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-base-content">{name.charAt(0).toUpperCase() + name.slice(1)}s</h1>
              <p className="mt-1 text-sm text-base-content/80">
                List of all registered {name}s with their contact information
              </p>
            </div>
            <Link to="/patients/register" className="btn btn-neutral btn-sm">
              Add {name.charAt(0).toUpperCase() + name.slice(1)}
            </Link>
          </div>

          {error ? (
            <div className="alert alert-error">{error}</div>
          ) : loading ? (
            <div className="text-center py-8">Loading {name}s...</div>
          ) : users && users.length === 0 ? (
            <div className="text-center py-8">No {name}s found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full border-collapse">
                <thead>
                  <tr className="border-b border-neutral-300">
                    <th className="border-r border-neutral-300 text-left p-4">Name</th>
                    <th className="border-r border-neutral-300 text-left p-4">Email</th>
                    <th className="border-r border-neutral-300 text-left p-4">Phone</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-neutral-300">
                      <td className="border-r border-neutral-300 p-4 font-medium">{user.fullName}</td>
                      <td className="border-r border-neutral-300 p-4">{user.email}</td>
                      <td className="border-r border-neutral-300 p-4">{user.phoneNumber}</td>
                      <td className="p-4">
                        <Link to={`/patients/${user.id}/edit`} className="text-neutral underline hover:text-neutral/80">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="">
                    <td className="border-r border-neutral-300 p-4 h-[54px] font-medium"></td>
                    <td className="border-r border-neutral-300 p-4 h-[54px]"></td>
                    <td className="border-r border-neutral-300 p-4 h-[54px]"></td>
                    <td className="p-4 h-[54px]"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Table