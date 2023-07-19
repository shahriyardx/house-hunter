import { Link, useNavigate } from "react-router-dom"
import Container from "../layouts/container"
import useUser from "../hooks/useUser"

const Header = () => {
  const navigate = useNavigate()
  const { decodedToken, reEvaluateToken } = useUser()

  return (
    <div>
      <Container className="flex items-center justify-between gap-5 py-10">
        <div className="flex flex-col">
          <span className="flex flex-col text-3xl font-bold">Dashboard</span>
          <span>House Hunter.</span>
        </div>

        <div className="flex items-center gap-5">
          <Link
            className="hover:underline underline-offset-2"
            to={`/dashboard/${decodedToken?.role as string}/bookings`}
          >
            Bookings
          </Link>
          <Link
            className="hover:underline underline-offset-2"
            to={`/dashboard/${decodedToken?.role as string}/add-new-house`}
          >
            Add New House
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken")
              reEvaluateToken()
              navigate("/login")
            }}
            className="font-bold text-red-600 rounded-full"
          >
            Logout
          </button>
        </div>
      </Container>
    </div>
  )
}

export default Header
