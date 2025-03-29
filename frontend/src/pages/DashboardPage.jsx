import Table from "../components/table/Table"

const DashboardPage = () => {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-200 to-base-100 p-4">
      <div className="">
        <Table name="patient" />
        <Table name="doctor" />
      </div>
    </main>
  )
}

export default DashboardPage