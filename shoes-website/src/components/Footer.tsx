'use client'

import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation';


export const Footer = () => {

const path = usePathname();    
const currentYear = new Date().getFullYear();
const copyrightText = `© ${currentYear} Random Fashion. All rights reserved.`;

return (
    <footer className='w-full h-1/4 flex flex-col justify-center items-center py-5 border-t-2'>
        <div id="foot-top" className='flex flex-col md:flex-row justify-around items-center'>
            <div id="foot-left">
                <h2 className='font-firlest text-3xl md:text-5xl font-bold text-center md:text-start'>Random Fashion</h2>
                <p className='text-sm md:text-lg'>Designed for Movement. Made for You.</p>
            </div>
            <div id="foot-right">
                <h3 className='text-lg font-bold my-[5%] hidden'>Links</h3>
                <br/>
                <ul className="nav-links flex justify-between items-center gap-2.5 lg:gap-5">
                    <li><Link href={"/"} className={path === "/" ? 'underline decoration-[#FF914D]' : 'ease-in-out duration-200 hover:text-[#FF914D]'} >Home</Link></li>
                    <li><Link href={"/menswear"} className={path === "/menswear" ? 'underline decoration-[#FF914D]' : 'ease-in-out duration-200 hover:text-[#FF914D]'} >Mens Wear</Link></li>
                    <li><Link href={"/womenwear"} className={path === "/womenwear" ? 'underline decoration-[#FF914D]' : 'ease-in-out duration-200 hover:text-[#FF914D]'} >Women Wear</Link></li>
                    <li><Link href={"/contact"} className={path === "/contact" ? 'underline decoration-[#FF914D]' : 'ease-in-out duration-200 hover:text-[#FF914D]'} >Contact Us</Link></li>
                </ul>
            </div>
        </div>
        <div id="foot-botom">
            <p id="copyright" className='text-center mt-[5%]'>{copyrightText}</p>
        </div>
    </footer>
  )
}
