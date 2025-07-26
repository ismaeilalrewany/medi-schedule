import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle.jsx'

const HomePage = () => {
  useDocumentTitle('MediSchedule - Home')

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-200 to-base-100">
      <div className="container mx-auto px-2">
        <header className="flex flex-col items-center text-center max-w-[700px] mx-auto gap-4 py-16">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-semibold mb-2 text-neutral">
            Effortless Appointment Scheduling
          </h1>
          <p className="text-sm sm:text-[16px] mb-4 text-neutral/80 max-w-[500px] md:max-w-none">
            MediSchedule helps you connect with top doctors and book your appointments seamlessly.
            Your health, your schedule, simplified.
          </p>
          <div>
            <Link
              to="/patients/appointments"
              className="btn btn-neutral text-neutral-content btn-sm md:btn-lg"
            >
              Book New Appointment
            </Link>
          </div>
        </header>

        <section className="pb-16">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body items-center text-center p-4">
                <i className="fa-solid fa-clock text-neutral text-2xl md:text-3xl"></i>
                <h2 className="card-title text-lg md:text-2xl mt-2">Easy Scheduling</h2>
                <p className="text-sm sm:text-[16px] text-neutral/80">
                  Find available doctors and book appointments at your convenience, 24/7.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-md">
              <div className="card-body items-center text-center p-4">
                <i className="fa-solid fa-briefcase-medical text-neutral text-2xl md:text-3xl"></i>
                <h2 className="card-title text-lg md:text-2xl mt-2">Expert Doctors</h2>
                <p className="text-sm sm:text-[16px] text-neutral/80">
                  Access a network of highly qualified and experienced healthcare professionals.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-md">
              <div className="card-body items-center text-center p-4">
                <i className="fa-solid fa-user-shield text-neutral text-2xl md:text-3xl"></i>
                <h2 className="card-title text-lg md:text-2xl mt-2">Secure & Private</h2>
                <p className="text-sm sm:text-[16px] text-neutral/80">
                  Your health data is protected with enterprise-grade security and privacy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-neutral">How It Works</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="font-semibold text-lg sm:text-xl text-neutral-800 mr-4">1.</span>
                  <p className="text-lg text-neutral-600">Choose a doctor from the list.</p>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-lg sm:text-xl text-neutral-800 mr-4">2.</span>
                  <p className="text-lg text-neutral-600">Select a date from the calander.</p>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-lg sm:text-xl text-neutral-800 mr-4">3.</span>
                  <p className="text-lg text-neutral-600">Select start time and end time.</p>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-lg sm:text-xl text-neutral-800 mr-4">4.</span>
                  <p className="text-lg text-neutral-600">Confirm your appointment.</p>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-lg sm:text-xl text-neutral-800 mr-4">5.</span>
                  <p className="text-lg text-neutral-600">Monitor your appointment status.</p>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center h-80 md:h-96 bg-gradient-to-br from-[#e2e8e800] to-[#111111] rounded-lg p-8">
              <div className="text-center text-white/70">
                <i className="fa-solid fa-chevron-up text-white/70 text-lg sm:text-xl"></i>
                <div className="font-mono text-lg sm:text-xl my-8 space-y-4 tracking-widest">
                  <p>APPOINTMENTS</p>
                  <p>CALENDAR</p>
                </div>
                <i className="fa-solid fa-chevron-down text-white/70 text-lg sm:text-xl"></i>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-neutral">
            What Our Patients Say
          </h2>
          <div className="card max-w-2xl mx-auto bg-white shadow">
            <div className="card-body p-4">
              <p className="text-sm sm:text-[16px] italic text-neutral-600">
                "MediSchedule made booking an appointment so simple and stress-free. I found a great
                doctor and booked a slot within minutes. Highly recommended!"
              </p>
              <p className="mt-2 sm:mt-4 font-semibold text-sm sm:text-[16px] text-neutral-800">
                - Jane Doe
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default HomePage
