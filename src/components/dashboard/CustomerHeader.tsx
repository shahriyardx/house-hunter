import { Link, useNavigate } from "react-router-dom"
import Container from "../layouts/container"
import useUser from "../hooks/useUser"

const CustomerHeader = () => {
  const navigate = useNavigate()
  const { reEvaluateToken } = useUser()

  return (
    <div>
      <Container className="flex items-center justify-between gap-5 py-10">
        <Link to="/dashboard/owner" className="flex flex-col">
          <span className="flex flex-col text-3xl font-bold">Dashboard</span>
          <span>House Hunter. (Customer)</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link className="hover:underline underline-offset-2" to="/">
            Home
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

export default CustomerHeader
