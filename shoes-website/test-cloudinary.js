// Test script to verify Cloudinary configuration
const { v2: cloudinary } = require('cloudinary');
require('dotenv').config({ path: '.env.local' });

async function testCloudinary() {
  try {
    console.log('Testing Cloudinary configuration...');
    console.log('CLOUDINARY_URL:', process.env.CLOUDINARY_URL ? 'Present' : 'Missing');
    
    // Configure cloudinary with URL
    if (process.env.CLOUDINARY_URL) {
      // Parse CLOUDINARY_URL manually
      const url = new URL(process.env.CLOUDINARY_URL);
      cloudinary.config({
        cloud_name: url.hostname,
        api_key: url.username,
        api_secret: url.password,
        secure: true
      });
      console.log('✅ Cloudinary configured with parsed CLOUDINARY_URL');
      console.log('Cloud name:', url.hostname);
      console.log('API key:', url.username);
    } else {
      console.log('❌ CLOUDINARY_URL not found');
      return;
    }
    
    // Test by getting account details
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful!');
    console.log('Account status:', result.status);
    
    // Test upload with a small image (base64 pixel)
    const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    
    const uploadResult = await cloudinary.uploader.upload(testImage, {
      public_id: 'test_upload_' + Date.now(),
      resource_type: 'image'
    });
    
    console.log('✅ Test upload successful!');
    console.log('Image URL:', uploadResult.secure_url);
    
    // Clean up test image
    await cloudinary.uploader.destroy(uploadResult.public_id);
    console.log('✅ Test cleanup completed');
    
  } catch (error) {
    console.error('❌ Cloudinary test failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('Invalid API key')) {
      console.log('\n🔧 Solution: Check your CLOUDINARY_URL format');
    } else if (error.message.includes('Network')) {
      console.log('\n🔧 Solution: Check your internet connection');
    } else {
      console.log('\n🔧 Solution: Verify your Cloudinary credentials');
    }
  }
}

testCloudinary();
