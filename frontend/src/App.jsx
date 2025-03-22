import Footer from "./layouts/Footer.jsx"
import Navbar from "./layouts/Navbar.jsx"
import AllLoginPage from "./pages/AllLoginPage.jsx"
import PatientRegisterPage from "./pages/PatientRegisterPage.jsx"
import DoctorRegisterPage from "./pages/DoctorRegisterPage.jsx"

const App = () => {
  return (
    <>
      <Navbar />
      <AllLoginPage />
      <PatientRegisterPage />
      <DoctorRegisterPage />
      <Footer />
    </>
  )
}

export default App