import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className='bg-zinc-900 text-white p-6 flex flex-row text-center justify-around items-center'>
      <h4> &copy; Hashir Shah </h4>
      <div className="socials font-bold flex justify-around gap-2">

      <Link className=' hover:text-blue-500' href={"https://github.com/pikacoder44"}>Github</Link>
      <Link className=' hover:text-blue-500' href={"https://github.com/pikacoder44"}>LinkedIn</Link>
      </div>
    </div>
  )
}

export default Footer
