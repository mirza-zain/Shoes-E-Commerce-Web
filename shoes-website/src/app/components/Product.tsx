'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Product() {
  interface ProductType {
    id: number;
    name: string;
    description: string;
    price: string;
    label: string;
    stock: string;
    image_url: string;
  }

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get_products.php`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error('Error Fetching Data:', error);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center p-10">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center p-10 text-red-500">{error}</p>;
  }

  return (
    <div id="products" className="flex justify-center items-center flex-wrap gap-2.5 p-2.5 bg-primary-light">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="card w-64 bg-transparent border-2 border-primary-dark rounded-xl shadow-xl/20 shadow-black transition-shadow overflow-hidden text-start">
            <Link href={`/viewitem/${product.id}`}>
              {product.image_url && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${product.image_url}`}
                  className="w-full h-60 object-cover"
                  width={240}
                  height={240}
                  alt={product.name}
                  priority
                />
              )}
              <h3 className="text-lg font-bold m-1">{product.name}</h3>
              <p className="text-lg font-bold m-1">${product.price}</p>
            </Link>
            <button className="text-lg font-bold capitalize px-3 py-2 m-1 bg-primary-orange text-primary-dark border border-primary-light rounded-lg cursor-pointer transition-colors hover:bg-primary-dark hover:text-white">
              Add to cart
            </button>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}