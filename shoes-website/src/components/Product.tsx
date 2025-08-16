'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ProductProps {
  category?: string; // Optional category filter
}

export default function Product({ category }: ProductProps) {
  interface ProductType {
    _id?: string;
    id?: number;
    name: string;
    description: string;
    price: string | number;
    label: string;
    stock: string | number;
    image_url?: string;
  }

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        
        // Filter products based on category if provided
        let filteredProducts = result;
        if (category) {
          filteredProducts = result.filter((product: ProductType) => {
            const productLabel = product.label.toLowerCase();
            const categoryFilter = category.toLowerCase();
            
            // Check if the product label matches the category
            if (categoryFilter === 'men' || categoryFilter === 'male') {
              return productLabel.includes('men') || 
                     productLabel.includes('male') || 
                     productLabel.includes('man') ||
                     productLabel === 'men' ||
                     productLabel === 'male';
            }
            
            if (categoryFilter === 'women' || categoryFilter === 'female') {
              return productLabel.includes('women') || 
                     productLabel.includes('girl') || 
                     productLabel.includes('woman') ||
                     productLabel === 'women' ||
                     productLabel === 'girl';
            }
            
            return productLabel.includes(categoryFilter);
          });
        }
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error Fetching Data:', error);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Add category as dependency

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
          <div key={product._id || product.id} className="card w-64 bg-transparent border-2 border-primary-dark rounded-xl shadow-xl/20 shadow-black transition-shadow overflow-hidden text-start">
            <Link href={`/viewitem/${product._id || product.id}`}>
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  className="w-full h-60 object-cover"
                  width={240}
                  height={240}
                  alt={product.name}
                  priority
                  onError={(e) => {
                    console.log('Image failed to load:', product.image_url);
                    // Fallback to a placeholder or hide the image
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
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
        <div className="text-center p-10">
          <p className="text-lg text-gray-600">
            {category ? `No ${category} products found.` : 'No products found.'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {category ? `Try adding some ${category} products in the admin panel.` : 'Try adding some products in the admin panel.'}
          </p>
        </div>
      )}
    </div>
  );
}
