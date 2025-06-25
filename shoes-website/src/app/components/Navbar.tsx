'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Navbar = () => {
  const path = usePathname()
  const [mobVisible, setMobVisible] = useState(false)

  const toggleButton = () => { setMobVisible(!mobVisible) }
  const handleClick = () => { setMobVisible(false) }

  return (
    <>
      <header className='w-full h-1/6 lg:h-1/4 flex-1 p-2.5 border-b-2 z-50'>
        <div id='Desktop' className='flex justify-between items-center p-5'>
          <div className="w-full mx-0  z-50">
            <h1 className='font-firlest text-4xl font-light'><Link href={"/"}>Random Fashion</Link></h1>
          </div>
          {mobVisible ?
            (<i className='ri-close-fill text-2xl  z-50' onClick={toggleButton} />)
            :
            (
              <div className='flex justify-around items-center gap-2 md:gap-5'>
                <i className='ri-shopping-bag-4-fill text-2xl' onClick={toggleButton} />
                <i className='ri-menu-2-line text-2xl ' onClick={toggleButton} />
              </div>
            )
          }
        </div>
      </header>
      {mobVisible && (
        <div id="Mobile" className='w-full h-screen bg-primary-light flex flex-col justify-center items-center fixed z-40'>
          <div>
          </div>
          <ul className='h-1/2 flex flex-col justify-around items-center text-lg'>
            <li><Link href={"/"} className={path === "/" ? 'underline decoration-[#FF914D]' : 'ease-in-out duration-200 hover:text-[#FF914D]'} onClick={handleClick}>Home</Link></li>
            <li><Link href={"/menswear"} className={path === "/menswear" ? 'underline decoration-[#FF914D]' : 'ease-in-out duration-200 hover:text-[#FF914D]'} onClick={handleClick}>Mens Wear</Link></li>
            <li><Link href={"/womenwear"} className={path === "/womenwear" ? 'underline decoration-[#FF914D]' : 'ease-in-out duration-200 hover:text-[#FF914D]'} onClick={handleClick}>Women Wear</Link></li>
            <li><Link href={"/contact"} className={path === "/contact" ? 'underline decoration-[#FF914D]' : 'ease-in-out duration-200 hover:text-[#FF914D]'} onClick={handleClick}>Contact Us</Link></li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar