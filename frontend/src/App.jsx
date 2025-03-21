import Footer from "./layouts/Footer.jsx"
import Navbar from "./layouts/Navbar.jsx"
// import LoginPage from "./pages/LoginPage.jsx"
import PatientRegisterPage from "./pages/PatientRegisterPage.jsx"

const App = () => {
  return (
    <>
      <Navbar />
      {/* <LoginPage /> */}
      <PatientRegisterPage />
      <Footer />
    </>
  )
}

export default App