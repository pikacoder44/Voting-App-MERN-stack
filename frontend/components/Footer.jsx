import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className='bg-primary text-background p-6 flex flex-row text-center justify-around items-center'>
      <h4> &copy; Hashir Shah </h4>
      <div className="socials font-bold flex justify-around gap-2">

      <Link className=' hover:text-blue-300' href={"https://github.com/pikacoder44"}>Github</Link>
      <Link className=' hover:text-blue-300' href={"https://www.linkedin.com/in/syedmhashirali/"}>LinkedIn</Link>
      </div>
    </div>
  )
}

export default Footer
