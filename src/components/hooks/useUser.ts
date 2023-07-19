import jwtDecode from "jwt-decode"
import { useCallback, useEffect, useState } from "react"

type UserPayload = {
  name: string
  email: string
  role: "customer" | "owner"
}

const useUser = () => {
  const token = localStorage.getItem("accessToken") || ""
  const [data, setData] = useState<UserPayload | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const getTokenData = useCallback(() => {
    setLoading(true)
    try {
      const data = jwtDecode(token)
      setLoading(false)
      return data as UserPayload
    } catch {
      setLoading(false)
      return null
    }
  }, [token])

  useEffect(() => {
    setData(getTokenData())
  }, [getTokenData])

  const refetch = () => {
    setData(getTokenData())
  }

  return { decodedToken: data, reEvaluateToken: refetch, loading }
}

export default useUser
