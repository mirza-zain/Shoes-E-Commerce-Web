'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Product = {
  _id?: string;
  id?: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  image_url?: string;
};

export default function ProductView() {

  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try 
      {
        const response = await fetch("/api/products");
        const result = await response.json()

        setProducts(result);
      } 
      catch(error) 
      {
        alert('Error Fetching Data: ' + error);
        setError(error);
      } 
        finally {
          isLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  return (
    <>
      {products &&
        products.map((product: Product) => (
          <div key={product._id || product.id} className='w-full flex flex-1 flex-col md:flex-row justify-between items-center'>
            <div className='w-full md:w-1/2 flex flex-col jusitfy-between items-start'>
                {product.image_url || product.image ? (
                  <Image 
                    className='p-5 object-cover' 
                    src={product.image_url || product.image || ''} 
                    width={500} 
                    height={500} 
                    alt={product.name || 'Product image'}
                    onError={(e) => {
                      console.log('Image failed to load:', product.image_url || product.image);
                      // Show placeholder instead
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className='w-[500px] h-[500px] bg-gray-200 flex items-center justify-center m-5'>
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
            </div>
            <div className='w-full md:w-1/2 flex flex-col justify-between items-start px-5 md:px-0'>
                <h3 className="text-3xl font-bold">{product.name}</h3>
                <br/>
                <p className='w-full md:w-3/4 text-lg text-justify'>{product.description}</p>
                <br/>
                <h4 className="text-lg font-bold">Price: <span className='font-light'>${product.price}</span></h4>
                <p className='text-sm'>Shipping tax will be applied</p>
                <br/>
                <button className='px-6 py-2 bg-primary-orange hover:bg-[#1A1A1A] hover:text-white cursor-pointer ease-in-out duration-200 rounded-md'>Add Item</button>
                <br/>
            </div>
          </div>
        ))
      }
    </>
  )
}