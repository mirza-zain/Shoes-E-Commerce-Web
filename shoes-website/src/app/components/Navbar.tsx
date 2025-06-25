'use client'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header id="navbar" className="w-full h-auto border-b-2 border-primary-dark flex justify-between items-center p-8.5">
        <div id="nav-left" className='flex justify-center items-center gap-2.5'>
            <h1 id="mainHeading" className='font-firlest text-3xl font-light cursor-pointer'>Random Fashion</h1>
        </div>
        <div id="nav-bottom" className='flex justify-center items-center gap-2.5'>
            <ul className="nav-links flex justify-between items-center list-none gap-5">
                <li><Link href={"/"} className='text-lg no-underline font-semibold hover:text-[#FF914D] transition-colors duration-500 ease-in-out'>Home</Link></li>
                <li><Link href={"/menswear"} className='text-lg no-underline font-semibold hover:text-[#FF914D] transition-colors duration-500 ease-in-out'>Mens Wear</Link></li>
                <li><Link href={"/womenwear"} className='text-lg no-underline font-semibold hover:text-[#FF914D] transition-colors duration-500 ease-in-out'>Women Wear</Link></li>
                <li><Link href={"/contact"} className='text-lg no-underline font-semibold hover:text-[#FF914D] transition-colors duration-500 ease-in-out'>Contact Us</Link></li>
            </ul>
        </div>
    </header>
  )
}

export default Navbar