import React from "react"

type Props = {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={`container mx-auto max-w-7xl px-5 ${className || ""}`}>
      {children}
    </div>
  )
}

export default Container
