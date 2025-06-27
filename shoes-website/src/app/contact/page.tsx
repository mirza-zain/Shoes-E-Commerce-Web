import React from 'react'

function page() {
  return (
    <main className='w-full flex flex-1 overflow-hidden'>
        <div className='w-screen'>
            <h2 className='m-[5%] text-4xl capitalize'>Fill your queries</h2>
            <form className='m-[5%] flex justify-around items-start flex-col gap-3'>
                <label className='text-lg font-bold'>Name</label>
                <input className='w-full h-10 text-sm' type="text" placeholder="Enter your full name" name="username" />
                <label className='text-lg font-bold'>Email</label>
                <input className='w-full h-10 text-sm' type="email" placeholder="Enter your email" name="email" />
                <label className='text-lg font-bold'>Message</label>
                <textarea id="textarea" className='w-full h-24 text-sm' name="message" placeholder='write our message'></textarea>
                <input id="button" className='px-4 py-2 rounded-md bg-primary-orange text-lg font-bold' type="submit" name="submit" value="Send" />
            </form>
        </div>
    </main>
  )
}

export default page