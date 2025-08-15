import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    
    // Simple ping to test connection
    await db.admin().ping();
    console.log('MongoDB connection successful');
    
    // Test collection access
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    return NextResponse.json({ 
      status: 'success',
      message: 'MongoDB connection working',
      database: process.env.DB_NAME,
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'MongoDB connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
