import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// DELETE a specific product
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

// UPDATE a specific product
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const updatedData = await request.json();
        delete updatedData._id; // Prevent updating the immutable _id field
        
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        await db.collection('products').updateOne(
            { _id: new ObjectId(params.id) },
            { $set: updatedData }
        );

        return NextResponse.json({ message: 'Product updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}