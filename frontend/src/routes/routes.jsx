import { createBrowserRouter } from "react-router-dom"
import App from "../App.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import LoginPage from "../pages/LoginPage.jsx"
import PatientRegisterPage from "../pages/PatientRegisterPage.jsx"
import DoctorRegisterPage from "../pages/DoctorRegisterPage.jsx"
import DashboardPage from "../pages/DashboardPage.jsx"
import ProfilePage from "../pages/ProfilePage.jsx"
import AppointmentsPage from "../pages/AppointmentsPage.jsx"
import NotFoundPage from "../pages/NotFoundPage.jsx"

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
            element: <AppointmentsPage endpoint={'patients/appointments'} role={'patient'} />,
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
            element: <AppointmentsPage endpoint={'doctors/appointments'} role={'doctor'} />,
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
            element: <AppointmentsPage endpoint={'admins/patients/:id/appointments'} isViewerAdmin={true} role={'patient'} />,
          },
          {
            path: "admins/doctors/:id/appointments",
            element: <AppointmentsPage endpoint={'admins/doctors/:id/appointments'} isViewerAdmin={true} role={'doctor'} />,
          }
        ]
      },
      {
        index: true, 
        element: <h1>Home Page</h1>,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "patients/register",
        element: <PatientRegisterPage />,
      }
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

export default routes