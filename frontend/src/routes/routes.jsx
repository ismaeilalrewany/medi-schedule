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
        element: <ProtectedRoute />,
        children: [
          {
            index: true, 
            element: <h1>Patients Appointments</h1>,
          },
          {
            path: "patients/appointments", 
            element: <h1>Patients Appointments</h1>,
          },
        ]
      },
      {
        path: "login",
        element: <AllLoginPage />,
      },
      {
        path: "patients/register",
        element: <PatientRegisterPage />,
      },
      {
        path: "doctors/register",
        element: <DoctorRegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>, 
  },
])

export default routes