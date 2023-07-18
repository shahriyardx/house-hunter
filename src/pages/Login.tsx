import { useEffect, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import Container from "../components/layouts/container"
import Main from "../components/layouts/main"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { API_BASE } from "../config"
import toast from "react-hot-toast"
import { ApiResponse } from "../types"
import { useNavigate } from "react-router-dom"

const LoginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "must be a valid email" }),
  password: z
    .string({ required_error: "password is required" })
    .min(1, { message: "password is required" }),
})

type LoginType = z.infer<typeof LoginSchema>

const Login = () => {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  })

  const submitHandler = async (values: LoginType) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      return toast.error("Something wen't wrong please try again")
    }

    const data = (await response.json()) as ApiResponse & {
      accessToken: string
      role: "customer" | "owner"
    }
    if (data.status === "error") {
      return toast.error(data.message)
    }

    if (data.status === "success") {
      localStorage.setItem("accessToken", data.accessToken)
      console.log(data)

      if (data.role == "owner") {
        toast.success("Logged in as owner")
        return navigate("/dashboard/owner")
      } else {
        toast.success("Logged in as customer")
        return navigate("/")
      }
    }
  }

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
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  {...register("email")}
                />
                <span className="text-sm text-red-500">
                  {errors?.email?.message}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    className="w-full"
                    {...register("password")}
                  />
                  <span className="text-sm text-red-500">
                    {errors?.password?.message}
                  </span>
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
