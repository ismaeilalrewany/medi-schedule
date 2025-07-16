import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Pagination from '../components/table/Pagination.jsx'
import Modal from '../components/modal/Modal.jsx'
import axios from 'axios'

const AppointmentsPage = ({ endpoint, isViewerAdmin = false, role }) => {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [filters, setFilters] = useState({ status: 'all', date: '', search: '' })
  const [selectedDate, setSelectedDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [paginationData, setPaginationData] = useState({})
  const [paginationPage, setPaginationPage] = useState(paginationData.currentPage || 1)

  const  baseURL = import.meta.env.VITE_API_URL
  const params = useParams()

  // Unified function to handle all appointment fetching (filtering, pagination, initial load)
  const fetchAppointments = useCallback(async (page = 1, customFilters = null) => {
    const resolvedEndpoint = `${baseURL}/api/${isViewerAdmin ? endpoint.replace(':id', params.id) : endpoint}`
    const filtersToUse = customFilters || filters

    try {
      const response = await axios.get(resolvedEndpoint, {
        params: {
          page,
          limit: 6,
          status: filtersToUse.status === 'all' ? undefined : filtersToUse.status || undefined,
          date: filtersToUse.date ? new Date(filtersToUse.date).toISOString() : undefined,
          search: filtersToUse.search?.trim() || undefined,
        },
        withCredentials: true
      })

      if (response.status >= 200 && response.status < 300) {
        setAppointments(response.data.appointments)
        setPaginationData(response.data.pagination)
        return response.data
      } else {
        throw new Error('Failed to fetch appointments')
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
      setAppointments([])
      setPaginationData({ currentPage: 1, totalPages: 1, totalItems: 0 })
      throw error
    }
  }, [baseURL, endpoint, isViewerAdmin, params.id])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const handleSubmitFilters = async (e) => {
    e.preventDefault()

    try {
      setPaginationPage(1)
      await fetchAppointments(1, filters)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      alert('An error occurred while fetching appointments. Please try again.')
    }
  }

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsModalOpen(true)
  }

  const handlePageChange = async (page) => {
    try {
      setPaginationPage(page)
      await fetchAppointments(page)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      alert('An error occurred while fetching appointments. Please try again.')
    }
  }

  const handleBookModalSubmit = async (e) => {
    e.preventDefault()
    if (!selectedDoctor || !selectedDate || !startTime || !endTime || !reason) {
      console.error('Please fill in all required fields.')
      return
    }

    const resolvedEndpoint = `${baseURL}/api/${isViewerAdmin ? endpoint.replace(':id', params.id) : endpoint}`
    try {
      const response = await axios.post(resolvedEndpoint, {
        doctorId: selectedDoctor,
        date: selectedDate,
        startTime,
        endTime,
        reason,
        notes,
      }, { withCredentials: true })

      if (response.status >= 200 && response.status < 300) {
        setIsBookModalOpen(false)
        // alert('Appointment booked successfully!')

        // Refresh appointments after booking
        await fetchAppointments(paginationPage)
      } else {
        console.error('Failed to book appointment:', response.data)
      }
    } catch (error) {
      console.error('Error booking appointment:', error)
      // alert('An error occurred while booking the appointment. Please try again.')
    }
  }

  const handleSubmitChanges = async (e) => {
    e.preventDefault()
    console.log('Submitting changes for appointment:', selectedAppointment)
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

  const availableTime = useCallback((selectedDoctor, selectedDate) => {
    if (selectedDoctor && selectedDate && doctors.length > 0) {
      const doctor = doctors.find(doctor => doctor.id === selectedDoctor)
      if (doctor && doctor.availableTimeSlots) {
        const slot = doctor.availableTimeSlots.find(slot => 
          new Date(selectedDate).getDay() === getDayIndex(slot.day) && slot.isAvailable
        )
        if (slot) {
          return { startTime: slot.startTime, endTime: slot.endTime }
        }
      }
    }
    return { startTime: '', endTime: '' }
  }, [doctors])

  useEffect(() => {
    const loadInitialAppointments = async () => {
    try {
      await fetchAppointments(1)
    } catch (error) {
      console.error('Error loading initial appointments:', error)
    }
  }
  
  loadInitialAppointments()
  }, [])

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/doctors`, { withCredentials: true })

        if (!response.data) {
          throw new Error('No data returned from API')
        }

        setDoctors(response.data.doctors)
      } catch (error) {
        console.error('Error fetching doctors:', error)
        setDoctors([])
      }
    }

    fetchDoctors()

    if (!isBookModalOpen) {
    // Reset all form states when modal closes
    setSelectedDoctor('')
    setSelectedDate('')
    setStartTime('')
    setEndTime('')
    setReason('')
    setNotes('')
  }
  }, [baseURL, isBookModalOpen])

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const timeSlot = availableTime(selectedDoctor, selectedDate)
      if (timeSlot.startTime && timeSlot.endTime) {
        setStartTime(timeSlot.startTime)
        setEndTime(timeSlot.endTime)
      } else {
        setStartTime('')
        setEndTime('')
      }
    }
  }, [selectedDoctor, selectedDate, doctors, availableTime])

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-8">
        <div className="container mx-auto px-2">
          {/* Page Header */}
          <header className="flex justify-between flex-wrap items-center mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-neutral">My Appointments</h1>
            {role === 'patient' && <button onClick={() => setIsBookModalOpen(true)} className="btn bg-neutral text-neutral-content border-0 btn-sm" >
              <i className="fas fa-plus mr-2"></i>
              Book New Appointment
            </button>}
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
                <button type="button" className="btn text-neutral/80" onClick={handleSubmitFilters} >Apply Filters</button>
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
                      <h3 className="text-lg font-semibold text-neutral capitalize">{role === 'doctor' ? `${appointment.patient.fullName}` : `Dr.${appointment.doctor.fullName}`}</h3>
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
                      {(appointment.status === 'pending' || appointment.status === 'confirmed') && (<button className="btn text-neutral btn-sm flex-1">Cancel</button>)}
                      <button onClick={() => handleViewDetails(appointment)} className="btn bg-neutral text-neutral-content border-0 btn-sm flex-1" >View Details</button>
                    </div>
                  </div>
                ))}
              </section>

              {/* Pagination */}
              <footer className="flex justify-end mt-8">
                <Pagination data={paginationData} setPage={handlePageChange} />
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
                    <option className="capitalize" key={doctor.id} value={doctor.id} >{doctor.fullName} ({doctor.specialization})</option>
                  ))
                ) : (
                  <option disabled>No doctors available</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" name="date" className="input input-bordered w-full" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time Slot</label>
              <div className="flex gap-4">
                <input type="time" name="startTime" className="input input-bordered w-full" disabled={!availableTime(selectedDoctor, selectedDate).startTime} value={startTime} onChange={(e) => setStartTime(e.target.value)} min={availableTime(selectedDoctor, selectedDate).startTime} max={availableTime(selectedDoctor, selectedDate).endTime} required />
                <input type="time" name="endTime" className="input input-bordered w-full" disabled={!availableTime(selectedDoctor, selectedDate).endTime} value={endTime} onChange={(e) => setEndTime(e.target.value)} min={availableTime(selectedDoctor, selectedDate).startTime} max={availableTime(selectedDoctor, selectedDate).endTime} required />
              </div>
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
      <Modal isOpen={isDetailsModalOpen && selectedAppointment !== null} onClose={() => setIsDetailsModalOpen(false)} title="Appointment Details" onSubmit={handleSubmitChanges} submitButtonText='Save Changes' showSubmitButton={role === 'doctor'} >
        {selectedAppointment && (
          <div className="space-y-3">
            <p className="capitalize"><strong>Doctor:</strong> {selectedAppointment.doctor.fullName} ({selectedAppointment.doctor.specialization}) {role === 'doctor' && '(You)'}</p>
            <p className="capitalize"><strong>Patient:</strong> {selectedAppointment.patient.fullName} {role === 'patient' && '(You)'}</p>
            <p><strong>Date:</strong> {new Date(selectedAppointment.date).toDateString()}</p>
            <p><strong>Time:</strong> {selectedAppointment.startTime} - {selectedAppointment.endTime}</p>
            <p>
              <strong>Status:</strong>
              {role === 'doctor' ? (
                <select className="select select-sm w-fit ms-2" name="status" readOnly>
                  <option value="all" disabled>{selectedAppointment.status}</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
              ) : (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(selectedAppointment.status)}`}>{selectedAppointment.status}</span>
              )}
            </p>
            <p className="capitalize"><strong>Reason:</strong> {selectedAppointment.reason}</p>
            <div>
              <strong>Notes:</strong>
              {role === 'doctor' ? (
                <textarea className="textarea textarea-bordered w-full mt-2" value={selectedAppointment.notes || ''} readOnly />
              ) : (
                <p className="mt-1 p-2 bg-gray-50 rounded text-sm text-gray-700">{selectedAppointment.notes || 'No additional notes.'}</p>
              )}
            </div>
            <p className="capitalize"><strong>Booked By:</strong> {selectedAppointment.createdBy}</p>
          </div>
        )}
      </Modal>
    </>
  )
}

export default AppointmentsPage