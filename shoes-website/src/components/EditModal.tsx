'use client';

import { useState } from 'react';
import { Product } from '../types';

interface EditModalProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onCancel: () => void;
}

export default function EditModal({ product, onSave, onCancel }: EditModalProps) {
  const [formData, setFormData] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'price' || name === 'stock' ? Number(value) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold mb-4">Edit {product.name}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input title='name' type="text" name="name" className="w-full p-2 border rounded" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
          <textarea title='description' name="description" className="w-full p-2 border rounded" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input title='price' type="number" name="price" step="0.01" className="w-full p-2 border rounded" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <input title='label' type="text" name="label" className="w-full p-2 border rounded" placeholder="Label" value={formData.label} onChange={handleChange} required />
          <input title='stock' type="number" name="stock" className="w-full p-2 border rounded" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
            <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}