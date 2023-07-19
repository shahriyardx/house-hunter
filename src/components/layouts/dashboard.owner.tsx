import React, { useEffect } from "react"
import Header from "../dashboard/Header"
import useUser from "../hooks/useUser"
import { useNavigate } from "react-router-dom"

type Props = {
  children?: React.ReactNode
}
const OwnerDashboardLayout = ({ children }: Props) => {
  const navigate = useNavigate()
  const { decodedToken, loading } = useUser()

  useEffect(() => {
    if (!decodedToken && !loading) {
      navigate("/login")
    }
  }, [decodedToken, navigate, loading])

  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default OwnerDashboardLayout
