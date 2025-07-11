const AppointmentsPage = ({ endpoint, isViewerAdmin = false }) => {
  return (
    <>
      <h1>Appointments Page</h1>
      <p>Endpoint: {endpoint}</p>
      <p>Is Viewer Admin: {isViewerAdmin ? 'Yes' : 'No'}</p>
    </>
  )
}

export default AppointmentsPage