import React from "react"
import Header from "../shared/Header"
import Footer from "../shared/Footer"

type Props = {
  children: React.ReactNode
}

const Main = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main className="min-h-[85vh] pb-20">{children}</main>
      <Footer />
    </div>
  )
}

export default Main
