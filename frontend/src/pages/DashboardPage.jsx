import TableSection from "../components/table/TableSection.jsx"

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-base-200 to-base-100">
      <div className="container mx-auto px-2">
        <div className="flex justify-center items-center flex-wrap gap-8 py-8">
          <TableSection title="patient" />
          <TableSection title="doctor" />
        </div>
      </div>
    </main>
  )
}

export default DashboardPage