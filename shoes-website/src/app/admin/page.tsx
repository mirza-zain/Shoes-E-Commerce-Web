import React from 'react'

export default function page() {
  return (
    <div className='w-full my-10 mx-auto py-3 px-2 rounded-md '>
        <h2 className='text-center text-4xl text-primary-orange mb-6 font-bold'>Admin Dashboard</h2>
        <form className='flex flex-col gap-3 mb-8'>
            <label className='font-bold text-primary-dark'>Product ID</label>
            <input type="text" className='p-2 border border-primary-light text-lg rounded-md' name="itemId" placeholder="Enter Product ID" />
            <label className='font-bold text-primary-dark'>Product Name</label>
            <input type="text" className='p-2 border border-primary-light text-lg rounded-md' name="itemName" placeholder="Enter Product Name" />
            <label className='font-bold text-primary-dark'>Product Description</label>
            <input type="text" className='p-2 border border-primary-light text-lg rounded-md' name="itemDes" placeholder="Enter Product Description" />
            <label className='font-bold text-primary-dark'>Product Price</label>
            <input type="text" className='p-2 border border-primary-light text-lg rounded-md' name="itemPrice" placeholder="Enter Product Price" />
            <label className='font-bold text-primary-dark'>Product Label</label>
            <input type="text" className='p-2 border border-primary-light text-lg rounded-md' name="itemLabel" placeholder="Enter Product Tag" />
            <label className='font-bold text-primary-dark'>Add Product Image</label>
            <input type="file" className='p-2 border border-primary-light text-lg rounded-md' name="itemPic" placeholder='Upload File' />
            <input type="submit" className='bg-primary-orange text-white rounded-md py-2.5 text-lg cursor-pointer mt-2 font-extrabold' value="Submit" name="submit" />
        </form>
        <table className='w-full border-collapse mt-4 bg-primary-white overflow-hidden rounded-lg'>
            <thead>
                <tr>
                    <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        ID
                    </th>
                    <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        Name
                    </th>
                    <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        Description
                    </th>
                    <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        Price
                    </th>
                    <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        Label
                    </th>
                    {/* <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        Image
                    </th> */}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="py-2.5 px-2 text-start border border-primary-light">101</td>
                    <td className="py-2.5 px-2 text-start border border-primary-light">Nike Air Max</td>
                    <td className="py-2.5 px-2 text-start border border-primary-light">Comfortable running shoes</td>
                    <td className="py-2.5 px-2 text-start border border-primary-light">$120</td>
                    <td className="py-2.5 px-2 text-start border border-primary-light">Men</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
