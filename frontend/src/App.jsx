import { Outlet } from "react-router-dom"
import Footer from "./layouts/Footer.jsx"
import Navbar from "./layouts/Navbar.jsx"

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App