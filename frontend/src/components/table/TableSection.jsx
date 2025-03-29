import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SearchUser from './SearchUser.jsx'
import Pagination from './Pagination.jsx'
import Table from './Table.jsx'

const TableSection = ({ name }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/${name}s`, {
          withCredentials: true,
        })
        setUsers(response.data)
      } catch (error) {
        console.error(`Error fetching ${name}s:`, error)
      }
    }

    fetchPatients()
  }, [])

  return (
    <section className="overflow-hidden rounded-lg ring-1 ring-neutral-300 bg-base-100 p-6">
      <header className="mb-6 text-neutral">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-base-content">{name.charAt(0).toUpperCase() + name.slice(1)}s</h1>
          <Link to="/patients/register" className="btn btn-neutral btn-sm">Add {name.charAt(0).toUpperCase() + name.slice(1)}</Link>
        </div>
        <SearchUser />
      </header>

      <Table users={users} />

      <footer className="mt-6 text-right">
        <Pagination />
      </footer>
    </section>
  )
}

export default TableSection