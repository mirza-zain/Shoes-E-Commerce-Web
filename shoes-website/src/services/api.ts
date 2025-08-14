import { Product } from '../types';

const API_BASE = '/api/products';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const addProduct = async (formData: FormData): Promise<Product> => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to add product');
  }
  return response.json();
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};