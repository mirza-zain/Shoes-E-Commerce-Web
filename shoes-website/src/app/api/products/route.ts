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
    console.log('POST /api/products - Starting...');
    
    const formData = await request.formData();
    console.log('Form data received');

    // Validate required fields
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const stock = formData.get('stock') as string;
    const label = formData.get('label') as string;
    const imageFile = formData.get('image') as File | null;

    if (!name || !description || !price || !stock || !label) {
      console.log('Missing required fields');
      return NextResponse.json({ 
        error: 'All fields (name, description, price, stock, label) are required.' 
      }, { status: 400 });
    }

    let imageUrl: string = '';

    if (!imageFile) {
      console.log('No image file provided, proceeding without image');
      imageUrl = '/Images/placeholder.png'; // Default placeholder image
    } else {
      console.log('Processing image upload...');
      
      try {
        // Check if we have a valid Vercel Blob token
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
        if (blobToken && blobToken.length > 10 && !blobToken.includes('commented')) {
          console.log('Uploading to Vercel Blob...');
          const blob = await put(imageFile.name, imageFile, { access: 'public' });
          imageUrl = blob.url;
          console.log('Image uploaded to Vercel Blob successfully:', imageUrl);
        } else {
          console.log('No valid Vercel Blob token found, using placeholder...');
          imageUrl = '/Images/placeholder.png';
        }
      } catch (uploadError) {
        console.log('Vercel Blob upload failed, using placeholder:', uploadError);
        imageUrl = '/Images/placeholder.png';
      }
    }

    // Prepare product data for MongoDB
    const newProductData = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      label,
      image_url: imageUrl,
    };

    // Validate parsed numbers
    if (isNaN(newProductData.price) || isNaN(newProductData.stock)) {
      return NextResponse.json({ 
        error: 'Price and stock must be valid numbers.' 
      }, { status: 400 });
    }

    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    
    console.log('Inserting product into database...');
    const result = await db.collection('products').insertOne(newProductData);
    console.log('Product inserted with ID:', result.insertedId);

    // Fetch the newly inserted document to return it
    const newProduct = await db.collection('products').findOne({ _id: result.insertedId });
    console.log('Product creation completed successfully');

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/products:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('BLOB')) {
        return NextResponse.json({ 
          error: 'Failed to upload image. Please check your Vercel Blob configuration.' 
        }, { status: 500 });
      }
      if (error.message.includes('MongoServerError') || error.message.includes('MONGODB')) {
        return NextResponse.json({ 
          error: 'Database connection failed. Please check your MongoDB configuration.' 
        }, { status: 500 });
      }
    }
    
    return NextResponse.json({ 
      error: 'Failed to add product. Please try again.' 
    }, { status: 500 });
  }
}