import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SearchUser from './SearchUser.jsx'
import Pagination from './Pagination.jsx'
import Table from './Table.jsx'

const TableSection = ({ title }) => {
  const [users, setUsers] = useState([])
  const [paginationData, setPaginationData] = useState({})
  const [paginationPage, setPaginationPage] = useState(paginationData.currentPage || 1)
  const [searchUser, setSearchUser] = useState('')

  // Reset page to 1 when search changes
  useEffect(() => {
    setPaginationPage(1)
  }, [searchUser, title])

  // Fetch users when title, paginationPage, or searchUser changes
  useEffect(() => {

    // console.log("paginationPage", paginationPage)
    // console.log("searchUser", searchUser)

    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/${title}s?limit=6&page=${paginationPage}&search=${searchUser}`, {
          withCredentials: true,
        })

        setUsers(response.data[`${title}s`])
        setPaginationData(response.data.pagination)

        // console.log("Debounce Test")
      } catch (error) {
        console.error(`Error fetching ${title}s:`, error)
      }
    }

    // Debounce the API call to avoid too many requests
    const debounceTimeout = setTimeout(() => {
      fetchPatients()
    }, 300)

    return () => {
      clearTimeout(debounceTimeout)
    }
  }, [title, paginationPage, searchUser])

  return (
    <section className="overflow-hidden rounded-lg ring-1 ring-neutral-300 bg-base-100 p-6 w-[800px]">
      <header className="mb-6 text-neutral">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-base-content">{title.charAt(0).toUpperCase() + title.slice(1)}s</h1>
          <Link to={`/${title}s/register`} className="btn btn-neutral btn-sm">Add {title.charAt(0).toUpperCase() + title.slice(1)}</Link>
        </div>
        <SearchUser search={searchUser} setSearch={setSearchUser} />
      </header>

      <Table users={users} />

      <footer className="mt-6 text-right">
        <Pagination data={paginationData} setPage={setPaginationPage} />
      </footer>
    </section>
  )
}

export default TableSection