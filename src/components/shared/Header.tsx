import { Link } from "react-router-dom"
import Container from "../layouts/container"
import useUser from "../hooks/useUser"

const Header = () => {
  const { decodedToken, reEvaluateToken } = useUser()

  return (
    <div className="shadow-md">
      <Container className="flex justify-between px-5 py-5">
        <Link to="/" className="text-xl font-bold">
          House Hunter.
        </Link>
        <div className="flex items-center gap-5">
          {decodedToken ? (
            <>
              <Link
                className="hover:underline underline-offset-2"
                to={`/dashboard/${decodedToken.role}`}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("accessToken")
                  reEvaluateToken()
                }}
                className="font-bold text-red-600 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="hover:underline underline-offset-2" to="/login">
                Login
              </Link>

              <Link
                className="hover:underline underline-offset-2"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Header
