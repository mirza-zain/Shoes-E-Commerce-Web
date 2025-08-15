import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET a specific product
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// DELETE a specific product
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

// UPDATE a specific product
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        console.log('PUT /api/products/[id] - Starting...');
        const { id } = await params;
        console.log('Product ID:', id);
        
        const updatedData = await request.json();
        console.log('Updated data received:', updatedData);
        
        delete updatedData._id; // Prevent updating the immutable _id field
        
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const result = await db.collection('products').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
        );

        console.log('Update result:', result);

        if (result.matchedCount === 0) {
            console.log('Product not found');
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Return the updated product
        const updatedProduct = await db.collection('products').findOne({ _id: new ObjectId(id) });
        console.log('Updated product:', updatedProduct);
        
        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}