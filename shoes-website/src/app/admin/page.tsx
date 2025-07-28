'use client';

import { useEffect, useState } from "react";

export default function AdminPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    // Form state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [label, setLabel] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('itemName', name);
        formData.append('itemDes', description);
        formData.append('itemPrice', price);
        formData.append('itemLabel', label);
        formData.append('itemStock', stock);
        if(image) formData.append('itemPic', image);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post_products.php`, {
                method: 'POST',
                body: formData
            });
            
            const text = await response.text();
            console.log('Response text:', text);
            
            try {
                const result = JSON.parse(text);
                if(result.success) {
                    alert('Product added successfully!');
                    resetForm();
                    getProducts();
                } else {
                    alert('Error: ' + result.message);
                }
            } catch {
                console.error('Invalid JSON response:', text);
                alert('Error: Invalid response from server');
            }
        } catch(error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        }
    }

    const handleUpdate = async (product: any) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update_products.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    label: product.label,
                    stock: product.stock
                })
            });
            
            const text = await response.text();
            console.log('Update response:', text);
            
            try {
                const result = JSON.parse(text);
                if(result.success) {
                    alert('Product updated successfully!');
                    setEditingProduct(null);
                    getProducts();
                }
            } catch {
                console.error('Invalid JSON response:', text);
            }
        } catch(error) {
            console.error('Error updating product:', error);
        }
    }

    const handleDelete = async (id: number) => {
        if(confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/delete_products.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id })
                });
                
                const text = await response.text();
                console.log('Delete response:', text);
                
                try {
                    const result = JSON.parse(text);
                    if(result.success) {
                        alert('Product deleted successfully!');
                        getProducts();
                    }
                } catch {
                    console.error('Invalid JSON response:', text);
                }
            } catch(error) {
                console.error('Error deleting product:', error);
            }
        }
    }

    const getProducts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get_products.php`);
            const text = await response.text();
            console.log('Get products response:', text);
            
            try {
                const result = JSON.parse(text);
                setProducts(result);
            } catch {
                console.error('Invalid JSON response:', text);
                setError('Invalid response from server');
            }
        } catch(error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setLabel('');
        setStock('');
        setImage(null);
    }

    useEffect(() => {
        getProducts();  
    }, [])

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>

    return (
        <div className='w-full my-10 mx-auto py-3 px-2 rounded-md'>
            <h2 className='text-center text-4xl text-primary-orange mb-6 font-bold'>Admin Dashboard</h2>
            
            {/* Add Product Form */}
            <form className='flex flex-col gap-3 mb-8' onSubmit={handleSubmit}>
                <input type="text" className='p-2 border border-primary-light text-lg rounded-md' placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" className='p-2 border border-primary-light text-lg rounded-md' placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="number" step="0.01" className='p-2 border border-primary-light text-lg rounded-md' placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input type="text" className='p-2 border border-primary-light text-lg rounded-md' placeholder="Category" value={label} onChange={(e) => setLabel(e.target.value)} required />
                <input type="number" className='p-2 border border-primary-light text-lg rounded-md' placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
                <input type="file" className='p-2 border border-primary-light text-lg rounded-md' accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required />
                <button type="submit" className='bg-primary-orange text-white rounded-md py-2.5 text-lg cursor-pointer font-extrabold'>Add Product</button>
            </form>
            
            {/* Products Table */}
            <table className='w-full border-collapse mt-4 bg-primary-white overflow-hidden rounded-lg'>
                <thead>
                    <tr>
                        <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">ID</th>
                        <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">Name</th>
                        <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">Price</th>
                        <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">Stock</th>
                        <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="py-2.5 px-2 border border-primary-light">{product.id}</td>
                            <td className="py-2.5 px-2 border border-primary-light">{product.name}</td>
                            <td className="py-2.5 px-2 border border-primary-light">${product.price}</td>
                            <td className="py-2.5 px-2 border border-primary-light">{product.stock}</td>
                            <td className="py-2.5 px-2 border border-primary-light">
                                <button onClick={() => setEditingProduct(product)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Edit Product</h3>
                        <input type="text" className="w-full p-2 border rounded mb-2" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                        <input type="number" className="w-full p-2 border rounded mb-2" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} />
                        <input type="number" className="w-full p-2 border rounded mb-4" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})} />
                        <div className="flex gap-2">
                            <button onClick={() => handleUpdate(editingProduct)} className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
                            <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}