import { createBrowserRouter } from "react-router-dom"
import App from "../App.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import AllLoginPage from "../pages/AllLoginPage.jsx"
import PatientRegisterPage from "../pages/PatientRegisterPage.jsx"
import DoctorRegisterPage from "../pages/DoctorRegisterPage.jsx"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Outlet
    children: [
      {
        element: <ProtectedRoute role={'patient'} />,
        children: [
          {
            path: "patients/appointments", 
            element: <h1>Patients Appointments</h1>,
          },
        ]
      },
      {
        element: <ProtectedRoute role={'doctor'} />,
        children: [
          {
            path: "doctors/appointments",
            element: <h1>Doctors Appointments</h1>,
          },
        ]
      },
      {
        element: <ProtectedRoute role={'admin'} />,
        children: [
          {
            path: "doctors/register",
            element: <DoctorRegisterPage />,
          },
          {
            path: "admins/dashboard",
            element: <h1>Admin Page</h1>,
          },
        ]
      },
      {
        index: true, 
        element: <h1>Home Page</h1>,
      },
      {
        path: "login",
        element: <AllLoginPage />,
      },
      {
        path: "patients/register",
        element: <PatientRegisterPage />,
      }
    ],
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>, 
  },
])

export default routes