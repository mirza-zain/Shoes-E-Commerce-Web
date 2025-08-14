'use client';

import { useEffect, useState, useRef } from 'react';
import { Product } from '@/types';
import * as api from '@/services/api';
import EditModal from '../../components/EditModal';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await api.addProduct(formData);
      fetchProducts(); // Refresh list
      e.currentTarget.reset(); // Clear form
    } catch (err) {
      alert('Error adding product.');
    }
  };

  const handleUpdate = async (updatedProduct: Product) => {
    try {
      await api.updateProduct(updatedProduct._id, updatedProduct);
      setEditingProduct(null);
      fetchProducts(); // Refresh list
    } catch (err) {
      alert('Error updating product.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await api.deleteProduct(id);
        fetchProducts(); // Refresh list
      } catch (err) {
        alert('Error deleting product.');
      }
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='w-full my-10 mx-auto py-3 px-2 rounded-md'>
      <h2 className='text-center text-4xl mb-6 font-bold'>Admin Dashboard</h2>
      
      {/* Add Product Form */}
      <form className='flex flex-col gap-3 mb-8' onSubmit={handleSubmit}>
        <input type="text" name="name" className='p-2 border rounded' placeholder="Product Name" required />
        <input type="text" name="description" className='p-2 border rounded' placeholder="Description" required />
        <input type="number" name="price" step="0.01" className='p-2 border rounded' placeholder="Price" required />
        <input type="text" name="label" className='p-2 border rounded' placeholder="Category" required />
        <input type="number" name="stock" className='p-2 border rounded' placeholder="Stock" required />
        <input title='image' type="file" name="image" ref={fileInputRef} className='p-2 border rounded' accept="image/*" required />
        <button type="submit" className='bg-primary-orange text-white rounded-md py-2.5 font-extrabold'>Add Product</button>
      </form>
      
      {/* Products Table */}
      <table className='w-full border-collapse mt-4'>
        {/* ... table headers ... */}
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2.5 px-2 border">{product._id}</td>
              <td className="py-2.5 px-2 border">{product.name}</td>
              <td className="py-2.5 px-2 border">${product.price}</td>
              <td className="py-2.5 px-2 border">{product.stock}</td>
              <td className="py-2.5 px-2 border">
                <button onClick={() => setEditingProduct(product)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingProduct && (
        <EditModal 
          product={editingProduct}
          onSave={handleUpdate}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}