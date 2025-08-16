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
          console.log('Filtering for category:', category);
          console.log('All products:', result.map((p: ProductType) => ({ name: p.name, label: p.label })));
          
          filteredProducts = result.filter((product: ProductType) => {
            const productLabel = product.label.toLowerCase().trim();
            const categoryFilter = category.toLowerCase().trim();
            
            console.log(`Checking product "${product.name}" with label "${productLabel}" against category "${categoryFilter}"`);
            
            // More precise matching to avoid conflicts
            if (categoryFilter === 'men' || categoryFilter === 'male') {
              // Check for exact matches or patterns that clearly indicate men's products
              const isMenProduct = productLabel === 'men' || 
                                   productLabel === 'male' ||
                                   productLabel === 'man' ||
                                   productLabel.startsWith('men') ||
                                   productLabel.startsWith('male') ||
                                   productLabel.startsWith('man') ||
                                   productLabel.endsWith('men') ||
                                   productLabel.endsWith('male') ||
                                   productLabel.endsWith('man') ||
                                   (productLabel.includes('men') && !productLabel.includes('women')) ||
                                   (productLabel.includes('male') && !productLabel.includes('female')) ||
                                   (productLabel.includes('man') && !productLabel.includes('woman'));
              
              console.log(`Is men's product: ${isMenProduct}`);
              return isMenProduct;
            }
            
            if (categoryFilter === 'women' || categoryFilter === 'female') {
              // Check for women's products
              const isWomenProduct = productLabel === 'women' || 
                                     productLabel === 'female' ||
                                     productLabel === 'woman' ||
                                     productLabel.startsWith('women') ||
                                     productLabel.startsWith('female') ||
                                     productLabel.startsWith('woman') ||
                                     productLabel.endsWith('women') ||
                                     productLabel.endsWith('female') ||
                                     productLabel.endsWith('woman') ||
                                     productLabel.includes('women') ||
                                     productLabel.includes('female') ||
                                     productLabel.includes('woman');
              
              console.log(`Is women's product: ${isWomenProduct}`);
              return isWomenProduct;
            }
            
            // For other categories, use simple includes
            const matches = productLabel.includes(categoryFilter);
            console.log(`General category match: ${matches}`);
            return matches;
          });
          
          console.log('Filtered products:', filteredProducts.map((p: ProductType) => ({ name: p.name, label: p.label })));
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