import Image from 'next/image'
import React from 'react'

export default function ProductView() {
  return (
    <div className='w-full flex flex-1 flex-col md:flex-row justify-between items-center'>
        <div className='w-full md:w-1/2'>
            <Image className='p-5 object-cover' src={"/Images/prod2.png"} width={500} height={500} alt='' />
        </div>
        <div className='w-full md:w-1/2 flex flex-col justify-between items-start px-5 md:px-0'>
            <h3 className="text-3xl font-bold">Nike Shoes</h3>
            <br/>
            <p className='w-full md:w-3/4 text-lg text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet illo aut, odit quasi voluptatibus fugit, iste quam iure, odio quaerat dolore autem corporis totam dolor!</p>
            <br/>
            <h4 className="text-lg font-bold">Price: <span className='font-light'>$200</span></h4>
            <p className='text-sm'>Shipping tax will be appilied</p>
            <br/>
            <button className='px-6 py-2 bg-primary-orange hover:bg-[#1A1A1A] hover:text-white cursor-pointer ease-in-out duration-200 rounded-md'>Add Item</button>
            <br/>
        </div>
    </div>
  )
}
