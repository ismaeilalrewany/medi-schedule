import { Outlet } from 'react-router-dom'
import Footer from './layouts/footer/Footer.jsx'
import Navbar from './layouts/navbar/Navbar.jsx'

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
