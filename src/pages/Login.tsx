import { useEffect, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import Container from "../components/layouts/container"
import Main from "../components/layouts/main"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const LoginSchema = z.object({
  email: z.string().email({ message: "must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 character long" }),
})

type LoginType = z.infer<typeof LoginSchema>

const Login = () => {
  const [showPass, setShowPass] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  })

  const submitHandler = (values: LoginType) => {
    console.log(values)
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
