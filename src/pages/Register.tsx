import { useEffect, useState } from "react"
import Container from "../components/layouts/container"
import Main from "../components/layouts/main"
import { BsHouses } from "react-icons/bs"
import { AiOutlineUser } from "react-icons/ai"
import { useSearchParams } from "react-router-dom"

type Roles = "customer" | "owner"

const Register = () => {
  const [role, setRole] = useState<Roles>("customer")
  const [params] = useSearchParams()

  useEffect(() => {
    const role = params.get("role")
    if (role) {
      if (["customer", "owner"].includes(role)) {
        setRole(role as Roles)
      }
    }
  }, [params])

  return (
    <Main>
      <section className="pt-20">
        <Container>
          <h1 className="text-xl text-center">Register</h1>
          <p className="mt-1 text-4xl font-bold text-center">
            Lets create an account
          </p>
          <div className="max-w-lg mx-auto mt-10">
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={`flex items-center justify-center gap-2 px-5 py-5 rounded-xl ${
                    role === "customer" ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setRole("customer")}
                >
                  <AiOutlineUser className="text-2xl" />
                  Renter
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center gap-2 px-5 py-5 rounded-xl ${
                    role === "owner" ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setRole("owner")}
                >
                  <BsHouses className="text-2xl" />
                  Owner
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="name">Full Name</label>
                <input type="text" placeholder="Full Name" id="name" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Email" id="email" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirm_password"
                  className="w-full"
                />
              </div>

              <div>
                <button className="px-5 py-3 text-white bg-black rounded-md">
                  Login
                </button>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </Main>
  )
}

export default Register
