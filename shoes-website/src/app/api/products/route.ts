import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { put } from '@vercel/blob';
import { Product } from '@/types';

// GET all products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const products = await db.collection('products').find({}).sort({ _id: -1 }).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST a new product
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
      return NextResponse.json({ error: 'Image file is required.' }, { status: 400 });
    }

    // Upload image to Vercel Blob
    const blob = await put(imageFile.name, imageFile, { access: 'public' });

    // Prepare product data for MongoDB
    const newProductData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string),
      label: formData.get('label') as string,
      image_url: blob.url, // Use the URL from Vercel Blob
    };
    
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const result = await db.collection('products').insertOne(newProductData);

    // Fetch the newly inserted document to return it
    const newProduct = await db.collection('products').findOne({ _id: result.insertedId });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}