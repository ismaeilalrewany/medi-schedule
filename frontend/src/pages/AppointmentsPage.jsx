import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Pagination from '../components/table/Pagination.jsx'
import Modal from '../components/modal/Modal.jsx'
import axios from 'axios'

const AppointmentsPage = ({ endpoint, isViewerAdmin = false, role }) => {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [filters, setFilters] = useState({ status: 'all', date: '', search: '' })
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [paginationData, setPaginationData] = useState({})
  const [paginationPage, setPaginationPage] = useState(paginationData.currentPage || 1)

  const  baseURL = import.meta.env.VITE_API_URL
  const params = useParams()

  const getAppointments = async () => {
    const resolvedEndpoint = `${baseURL}/api/${isViewerAdmin ? endpoint.replace(':id', params.id) : endpoint}`
    const response = await axios.get(resolvedEndpoint, { withCredentials: true })

    if (!response.data) {
      throw new Error('No data returned from API')
    }
    return response.data
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsModalOpen(true)
  }

  const handleBookAppointment = (formData) => {
    // Handle booking logic here
    console.log('Booking appointment:', formData)
    setIsBookModalOpen(false);
    // Add to appointments or refresh from API
  }

  const handleBookModalSubmit = (e) => {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    handleBookAppointment(data);
  }

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'text-green-700 bg-green-100',
      pending: 'text-yellow-700 bg-yellow-100',
      completed: 'text-blue-700 bg-blue-100',
      canceled: 'text-red-700 bg-red-100'
    }
    return colors[status] || 'text-gray-700 bg-gray-100'
  }

  const getDayIndex = (day) => {
    const days = {sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6}
    return days[day]
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments()
        setAppointments(data.appointments)
        setPaginationData(data.pagination)
        setDoctors(data.doctors)
      } catch (error) {
        console.error('Error fetching appointments:', error)
        setAppointments([])
        setPaginationData({ currentPage: 1, totalPages: 1, totalItems: 0 })
        setDoctors([])
      }
    }

    fetchAppointments()
  }, [])

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-8">
        <div className="container mx-auto px-2">
          {/* Page Header */}
          <header className="flex justify-between flex-wrap items-center mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-neutral">My Appointments</h1>
            <button onClick={() => setIsBookModalOpen(true)} className="btn bg-neutral text-neutral-content border-0 btn-sm" >
              <i className="fas fa-plus mr-2"></i>
              Book New Appointment
            </button>
          </header>

          {/* Filters */}
          <section className="bg-white rounded-lg p-4 mb-6 ring-1 ring-neutral-300 shadow">
            <h3 className="text-lg font-semibold text-neutral/90 mb-3">Filter Appointments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="select select-bordered w-full" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)} >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" className="input input-bordered w-full" value={filters.date} onChange={(e) => handleFilterChange('date', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input type="text" className="input input-bordered w-full" placeholder={`${role === 'patient' ? 'Doctor' : 'Patient'} Name`} value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} />
              </div>
              <div className="self-end">
                <button type="submit" className="btn text-neutral/80" >Apply Filters</button>
              </div>
            </div>
          </section>

          {appointments.length > 0 ? (
            <>
              {/* Appointments Grid */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map((appointment) => (
                  <div key={appointment._id} className={`bg-white rounded-lg p-5 ring-1 ring-neutral-300 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-neutral capitalize">Dr.{appointment.doctor.fullName}</h3>
                      <span className={`px-2 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(appointment.status)}`}>{appointment.status}</span>
                    </div>

                    <div className="space-y-1 mb-4">
                      <p className="text-sm text-gray-600 capitalize">
                        <i className="fas fa-user-md mr-2 text-gray-400"></i>
                        {appointment.doctor.specialization}
                      </p>
                      <p className="text-sm text-gray-600">
                        <i className="fas fa-calendar-alt mr-2 text-gray-400"></i>
                        {new Date(appointment.date).toDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <i className="fas fa-clock mr-2 text-gray-400"></i>
                        {appointment.startTime} - {appointment.endTime}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        <strong>Reason:</strong> {appointment.reason}
                      </p>
                    </div>

                    <div className="flex space-x-2 pt-4 border-t border-neutral-200">
                      {appointment.status !== 'completed' && (<button className="btn text-neutral btn-sm flex-1">Cancel</button>)}
                      <button onClick={() => handleViewDetails(appointment)} className="btn bg-neutral text-neutral-content border-0 btn-sm flex-1" >View Details</button>
                    </div>
                  </div>
                ))}
              </section>

              {/* Pagination */}
              <footer className="flex justify-end mt-8">
                <Pagination data={paginationData} setPage={setPaginationPage} />
              </footer>
            </>
            ) : (
              <div className="text-center text-neutral-400">
                <p className="text-lg">No appointments found.</p>
                <p className="mt-2">Try adjusting your filters or book a new appointment.</p>
              </div>
            )}
        </div>
      </main>

      {/* Book Appointment Modal */}
      <Modal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} title="Book New Appointment" onSubmit={handleBookModalSubmit} submitButtonText="Request Appointment" >
        <form id="book-appointment-form">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
              <select name="doctor" className="select select-bordered w-full" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
                <option disabled value="">Choose a doctor</option>
                {doctors.length > 0 ? (
                  doctors.map(doctor => (
                    <option className="capitalize" key={doctor._id} value={doctor._id} >{doctor._id}</option>
                  ))
                ) : (
                  <option disabled>No doctors available</option>
                )}
              </select>
            </div>
                {selectedDoctor}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" name="date" className="input input-bordered w-full" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time Slot</label>
              <select name="timeSlot" className="select select-bordered w-full" required>
                <option disabled selected>Select a time</option>
                {/* {selectedDoctor.availableTimeSlots && selectedDoctor.availableTimeSlots.map((_id, day, startTime, endTime, isAvailable) => {
                  new Date(selectedDate).getDay() === getDayIndex(day) && isAvailable ?
                  <option key={_id} value={`${startTime} - ${endTime}`}>{startTime} - {endTime}</option> :
                  <option key={_id} disabled>Unavailable</option>
                })} */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
              <input type="text" name="reason" className="input input-bordered w-full" placeholder="e.g., Annual Checkup, Consultation" value={reason} onChange={(e) => setReason(e.target.value)}  required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
              <textarea name="notes" className="textarea textarea-bordered w-full" placeholder="Any other information..." value={notes} onChange={(e) => setNotes(e.target.value)} ></textarea>
            </div>
          </div>
        </form>
      </Modal>

      {/* Appointment Details Modal */}
      <Modal isOpen={isDetailsModalOpen && selectedAppointment !== null} onClose={() => setIsDetailsModalOpen(false)} title="Appointment Details" showSubmitButton={false} >
        {selectedAppointment && (
          <div className="space-y-3">
            <p className="capitalize"><strong>Doctor:</strong> {selectedAppointment.doctor.fullName} ({selectedAppointment.doctor.specialization}) {role === 'doctor' && '(You)'}</p>
            <p className="capitalize"><strong>Patient:</strong> {selectedAppointment.patient.fullName} {role === 'patient' && '(You)'}</p>
            <p><strong>Date:</strong> {new Date(selectedAppointment.date).toDateString()}</p>
            <p><strong>Time:</strong> {selectedAppointment.startTime} - {selectedAppointment.endTime}</p>
            <p>
              <strong>Status:</strong>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(selectedAppointment.status)}`}>{selectedAppointment.status}</span>
            </p>
            <p className="capitalize"><strong>Reason:</strong> {selectedAppointment.reason}</p>
            <div>
              <strong>Notes:</strong>
              <p className="mt-1 p-2 bg-gray-50 rounded text-sm text-gray-700">{selectedAppointment.notes || 'No additional notes.'}</p>
            </div>
            <p className="capitalize"><strong>Booked By:</strong> {selectedAppointment.createdBy}</p>
          </div>
        )}
      </Modal>
    </>
  )
}

export default AppointmentsPage