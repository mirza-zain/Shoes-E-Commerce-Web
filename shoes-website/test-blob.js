// Test script to verify Vercel Blob token
const { put, list } = require('@vercel/blob');
require('dotenv').config({ path: '.env.local' });

async function testBlobToken() {
  try {
    console.log('Testing Vercel Blob token...');
    console.log('Token:', process.env.BLOB_READ_WRITE_TOKEN ? 'Present' : 'Missing');
    console.log('Token length:', process.env.BLOB_READ_WRITE_TOKEN?.length || 0);
    
    // Test by listing existing blobs
    const { blobs } = await list();
    console.log('✅ Blob token is working!');
    console.log('Existing blobs:', blobs.length);
    
    // Test upload with a small text file
    const testContent = 'Test upload';
    const blob = await put('test.txt', testContent, { access: 'public' });
    console.log('✅ Upload test successful!');
    console.log('Test file URL:', blob.url);
    
  } catch (error) {
    console.error('❌ Blob token test failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('Invalid token')) {
      console.log('\n🔧 Solution: Create a new Vercel Blob store and update your token');
    } else if (error.message.includes('Network')) {
      console.log('\n🔧 Solution: Check your internet connection');
    } else {
      console.log('\n🔧 Solution: Verify your BLOB_READ_WRITE_TOKEN in .env.local');
    }
  }
}

testBlobToken();
