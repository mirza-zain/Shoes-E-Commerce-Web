'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Product = {
  _id?: string;
  id?: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  image_url?: string;
};

export default function ProductViewPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const products: Product[] = await response.json();
        
        // Find the specific product by ID
        const foundProduct = products.find(p => 
          (p._id && p._id === productId) || 
          (p.id && p.id.toString() === productId)
        );
        
        if (!foundProduct) {
          throw new Error('Product not found');
        }
        
        setProduct(foundProduct);
      } catch(err) {
        console.error('Error Fetching Product:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-64">Product not found</div>;
  }

  return (
    <div className='w-full flex flex-1 flex-col md:flex-row justify-between items-center p-5'>
      <div className='w-full md:w-1/2 flex flex-col justify-between items-start'>
        <Image 
          className='p-5 object-cover' 
          src={product.image_url || product.image || '/Images/prod1.png'} 
          width={500} 
          height={500} 
          alt={product.name} 
        />
      </div>
      <div className='w-full md:w-1/2 flex flex-col justify-between items-start px-5 md:px-0'>
        <h3 className="text-3xl font-bold">{product.name}</h3>
        <br/>
        <p className='w-full md:w-3/4 text-lg text-justify'>{product.description}</p>
        <br/>
        <h4 className="text-lg font-bold">Price: <span className='font-light'>${product.price}</span></h4>
        <p className='text-sm'>Shipping tax will be applied</p>
        <br/>
        <button className='px-6 py-2 bg-primary-orange hover:bg-[#1A1A1A] hover:text-white cursor-pointer ease-in-out duration-200 rounded-md'>
          Add Item
        </button>
        <br/>
      </div>
    </div>
  )
}
