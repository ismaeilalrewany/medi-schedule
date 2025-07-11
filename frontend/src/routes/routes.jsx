import { createBrowserRouter } from "react-router-dom"
import App from "../App.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import AllLoginPage from "../pages/AllLoginPage.jsx"
import PatientRegisterPage from "../pages/PatientRegisterPage.jsx"
import DoctorRegisterPage from "../pages/DoctorRegisterPage.jsx"
import DashboardPage from "../pages/DashboardPage.jsx"
import ProfilePage from "../pages/ProfilePage.jsx"

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
          {
            path: "patients/profile",
            element: <ProfilePage endpoint={'patients/profile'} />,
          }
        ]
      },
      {
        element: <ProtectedRoute role={'doctor'} />,
        children: [
          {
            path: "doctors/appointments",
            element: <h1>Doctors Appointments</h1>,
          },
          {
            path: "doctors/profile",
            element: <ProfilePage endpoint={'doctors/profile'} />,
          }
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
            element: <DashboardPage />,
          },
          {
            path: "admins/profile",
            element: <ProfilePage endpoint={'admins/profile'} />,
          },
          {
            path: "admins/patients/:id",
            element: <ProfilePage endpoint={'admins/patients/:id'} isViewerAdmin={true} />,
          },
          {
            path: "admins/doctors/:id",
            element: <ProfilePage endpoint={'admins/doctors/:id'}  isViewerAdmin={true} />,
          },
          {
            path: "admins/patients/:id/appointments",
            element: <h1>Admin Patient Appointments</h1>,
          },
          {
            path: "admins/doctors/:id/appointments",
            element: <h1>Admin Doctor Appointments</h1>,
          }
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