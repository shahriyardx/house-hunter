import React from "react"
import { Link } from "react-router-dom"
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram } from "react-icons/bi"

import Container from "../layouts/container"

const Footer = () => {
  return (
    <div className="border-t-2">
      <Container className="flex flex-col items-center py-20 ">
        <h1 className="text-4xl font-extrabold">House Hunter</h1>
        <p className="mt-2 max-w-[65ch] text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
          labore, necessitatibus magni, omnis, expedita officia aut iure quidem
          nostrum odio sint cupiditate minus obcaecati ducimus assumenda cum
          quisquam aliquid aperiam.
        </p>

        <div className="flex items-center gap-3 mt-5">
          <SocialLogo>
            <BiLogoFacebook className="text-4xl" />
          </SocialLogo>

          <SocialLogo>
            <BiLogoTwitter className="text-4xl" />
          </SocialLogo>

          <SocialLogo>
            <BiLogoInstagram className="text-4xl" />
          </SocialLogo>
        </div>
      </Container>
    </div>
  )
}

const SocialLogo = ({ children }: { children: React.ReactNode }) => {
  return (
    <Link
      to="#"
      className="p-2 text-white rounded-full cursor-pointer bg-zinc-800 hover:bg-zinc-600 hover:text-white "
    >
      {children}
    </Link>
  )
}
export default Footer
