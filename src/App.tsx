import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import OwnerDashboard from "./pages/dashboard/owner/OwnerDashboard"

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard/owner", element: <OwnerDashboard /> },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
