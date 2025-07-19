'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import ProductView from './ProductView';
import Link from 'next/link';


export default function Product() {
// Array of product data
interface ProductType {
  id: number;
  name: string;
  price: string;
  image: string;
}

const [products, setProducts] = useState<ProductType[] | null>(null);
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try 
      {
        const response = await fetch("http://localhost:8000/models/admin.php");
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
    <div id="products" className="flex justify-center items-center flex-wrap gap-2.5 p-2.5 bg-primary-light">
        {products &&
            products.map((product) => (
                <div key={product.id} className="card w-64 bg-transparent border-2 border-primary-dark rounded-xl shadow-xl/20 shadow-black transition-shadow overflow-hidden text-start ">
                    <Link href={"/viewitem"}>
                    <Image id="sneaker" src={product.image} className="w-full h-60 object-cover" width={240} height={240} alt={product.name} />
                    <h3 className="text-lg font-bold m-1">{product.name}</h3>
                    <p className="text-lg font-bold m-1">{product.price}</p>
                    </Link>
                    <button className="text-lg font-bold capitalize px-3 py-2 m-1 bg-primary-orange text-primary-dark border border-primary-light rounded-lg cursor-pointer transition-colors hover:bg-primary-dark hover:text-white">Add to cart</button>                
                </div>
            ))
        }
    </div>
  )
}
