import { Link } from 'react-router-dom'

const Table = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-collapse text-neutral">
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
                <Link to={`/admins/${user.role}s/${user.id}`} className="text-neutral underline hover:text-neutral/80 me-4">Profile</Link>
                <Link to={`/admins/${user.role}s/${user.id}/appointments`} className="text-neutral underline hover:text-neutral/80">Appointments</Link>
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
  )
}

export default Table