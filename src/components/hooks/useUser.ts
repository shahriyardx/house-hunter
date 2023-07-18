import { useJwt } from "react-jwt"

type UserPayload = {
  name: string
  email: string
  role: "customer" | "owner"
}

const useUser = () => {
  const { decodedToken, isExpired, reEvaluateToken } =
    useJwt<UserPayload | null>(localStorage.getItem("accessToken") || "")

  const refetch = () => {
    reEvaluateToken(localStorage.getItem("accessToken") || "")
  }

  return { decodedToken, isExpired, reEvaluateToken: refetch }
}

export default useUser
