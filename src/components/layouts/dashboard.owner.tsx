import React from "react"

type Props = {
  children?: React.ReactNode
}
const OwnerDashboardLayout = ({ children }: Props) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

export default OwnerDashboardLayout
