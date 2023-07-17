import { Link } from "react-router-dom"
import Container from "../layouts/container"

const Header = () => {
  return (
    <div className="shadow-md">
      <Container className="flex justify-between px-5 py-5">
        <Link to="/" className="text-xl font-bold">
          House Hunter.
        </Link>
        <div>
          <Link className="hover:underline underline-offset-2" to="/login">
            Login
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default Header
