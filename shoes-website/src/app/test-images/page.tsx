'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ImageTestPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        console.log('Products data:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      
      {products.map((product) => (
        <div key={product._id} className="border p-4 mb-4">
          <h3 className="font-bold">{product.name}</h3>
          <p><strong>Image URL:</strong> {product.image_url}</p>
          
          {/* Test with Next.js Image */}
          <div className="mt-2">
            <h4>Next.js Image Component:</h4>
            {product.image_url ? (
              <Image
                src={product.image_url}
                width={200}
                height={200}
                alt={product.name}
                onError={() => console.log('Next.js Image failed:', product.image_url)}
                onLoad={() => console.log('Next.js Image loaded:', product.image_url)}
                className="border"
              />
            ) : (
              <p>No image URL</p>
            )}
          </div>
          
          {/* Test with regular img tag */}
          <div className="mt-2">
            <h4>Regular img tag:</h4>
            {product.image_url ? (
              <img
                src={product.image_url}
                width={200}
                height={200}
                alt={product.name}
                onError={() => console.log('Regular img failed:', product.image_url)}
                onLoad={() => console.log('Regular img loaded:', product.image_url)}
                className="border"
              />
            ) : (
              <p>No image URL</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
