import { useEffect, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import Container from "../components/layouts/container"
import Main from "../components/layouts/main"

const Login = () => {
  const [showPass, setShowPass] = useState<boolean>(false)

  useEffect(() => {
    if (showPass) {
      setTimeout(() => {
        setShowPass(false)
      }, 2000)
    }
  }, [showPass])

  return (
    <Main>
      <section className="pt-20">
        <Container>
          <h1 className="text-xl text-center">House Hunter.</h1>
          <p className="mt-1 text-4xl font-bold text-center">
            Good to see you again
          </p>
          <div className="max-w-lg mx-auto mt-10">
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Email" id="email" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    className="w-full"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-3"
                  >
                    {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>
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

export default Login
