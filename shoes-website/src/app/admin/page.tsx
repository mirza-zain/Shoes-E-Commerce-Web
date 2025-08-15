'use client';

import { useEffect, useState, FormEvent } from "react";
import { Product } from "@/types";
import EditModal from "@/components/EditModal";

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent double submission
        
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            console.log('Submitting form...');
            console.log('Environment:', process.env.NODE_ENV);
            
            const response = await fetch('/api/products', { 
                method: 'POST', 
                body: formData 
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error(errorData.error || 'Failed to add product');
            }
            
            const newProduct = await response.json();
            console.log('Product added successfully:', newProduct);
            
            await fetchProducts(); // Refresh list
            (e.target as HTMLFormElement).reset(); // Clear form
            alert('Product added successfully!');
        } catch (err) {
            console.error('Submit error:', err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            alert(`Failed to add product: ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete product');
            await fetchProducts(); // Refresh list
        } catch (err) {
            alert(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
    };

    const handleSaveEdit = async (updatedProduct: Product) => {
        try {
            console.log('Updating product:', updatedProduct);
            
            const response = await fetch(`/api/products/${updatedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            console.log('Update response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Update error response:', errorData);
                throw new Error(errorData.error || 'Failed to update product');
            }

            const result = await response.json();
            console.log('Update successful:', result);

            await fetchProducts(); // Refresh list
            setEditingProduct(null); // Close modal
            alert('Product updated successfully!');
        } catch (err) {
            console.error('Update error:', err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            alert(`Failed to update product: ${errorMessage}`);
        }
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='w-full my-10 mx-auto py-3 px-2 rounded-md'>
            <h2 className='text-center text-4xl font-bold mb-6'>Admin Dashboard</h2>
            
            <form className='flex flex-col gap-3 mb-8' onSubmit={handleSubmit}>
                {/* Inputs for adding a product */}
                <input type="text" name="name" className='p-2 border rounded' placeholder="Product Name" required />
                <input type="text" name="description" className='p-2 border rounded' placeholder="Description" required />
                <input type="number" name="price" step="0.01" className='p-2 border rounded' placeholder="Price" required />
                <input type="text" name="label" className='p-2 border rounded' placeholder="Label" required />
                <input type="number" name="stock" className='p-2 border rounded' placeholder="Stock" required />
                <input type="file" name="image" className='p-2 border rounded' accept="image/*" title="image" required />
                <button type="submit" disabled={isSubmitting} className={`${isSubmitting ? 'bg-gray-400' : 'bg-primary-orange'} text-white rounded-md py-2.5 font-extrabold`}>
                    {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </button>
            </form>
            
            <table className='w-full border-collapse mt-4'>
                <thead>
                    <tr>
                        <th className="py-2 px-2 text-left border">Name</th>
                        <th className="py-2 px-2 text-left border">Price</th>
                        <th className="py-2 px-2 text-left border">Stock</th>
                        <th className="py-2 px-2 text-left border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td className="py-2 px-2 border">{product.name}</td>
                            <td className="py-2 px-2 border">${product.price}</td>
                            <td className="py-2 px-2 border">{product.stock}</td>
                            <td className="py-2 px-2 border">
                                <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {editingProduct && (
                <EditModal
                    product={editingProduct}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
}