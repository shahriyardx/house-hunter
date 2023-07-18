import { useEffect, useState } from "react"
import Container from "../components/layouts/container"
import Main from "../components/layouts/main"
import { BsHouses } from "react-icons/bs"
import { AiOutlineUser } from "react-icons/ai"
import { useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { API_BASE } from "../config"
import { ApiResponse } from "../types"

type Roles = "customer" | "owner"

const RegistrationSchema = z
  .object({
    name: z.string().min(3, { message: "name is too short" }),
    email: z.string().email({ message: "must be a valid email" }),
    role: z.enum(["customer", "owner"]),
    password: z
      .string()
      .min(8, { message: "password must be atleast 8 character long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "password must be atleast 8 character long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwords do not match",
  })

type RegistrationType = z.infer<typeof RegistrationSchema>

const Register = () => {
  const [role, setRole] = useState<Roles>("customer")
  const [params] = useSearchParams()

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegistrationType>({
    resolver: zodResolver(RegistrationSchema),
  })

  const submitHandler = async (values: RegistrationType) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      return toast.error("Something wen't wrong please try again")
    }

    const data = (await response.json()) as ApiResponse
    if (data.status === "error") {
      return toast.error(data.message)
    }

    if (data.status === "success") {
      toast.success(data.message)
      reset()
      return
    }
  }

  useEffect(() => {
    const role = params.get("role")

    if (role) {
      if (["customer", "owner"].includes(role)) {
        setRole(role as Roles)
        setValue("role", role as Roles)
      } else {
        setValue("role", "customer")
      }
    } else {
      setValue("role", "customer")
    }
  }, [params, setValue])

  return (
    <Main>
      <section className="pt-20">
        <Container>
          <h1 className="text-xl text-center">Register</h1>
          <p className="mt-1 text-4xl font-bold text-center">
            Lets create an account
          </p>
          <div className="max-w-lg mx-auto mt-10">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex flex-col gap-5"
            >
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
                <input
                  type="text"
                  placeholder="Full Name"
                  id="name"
                  {...register("name")}
                />
                <span className="text-sm text-red-500">
                  {errors?.name?.message}
                </span>
              </div>

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
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="w-full"
                  {...register("password")}
                />
                <span className="text-sm text-red-500">
                  {errors?.password?.message}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirm_password"
                  className="w-full"
                  {...register("confirmPassword")}
                />
                <span className="text-sm text-red-500">
                  {errors?.confirmPassword?.message}
                </span>
              </div>

              <div>
                <button className="px-5 py-3 text-white bg-black rounded-md">
                  Register
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
