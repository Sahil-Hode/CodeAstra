// Simple test script for API endpoints
// Run with: node test-api.js

const axios = require('axios');

const BASE_URL = 'http://localhost:3000'; // Change to your Vercel URL for production

async function testAPI() {
  try {
    console.log('🧪 Testing CodeAstra API endpoints...\n');

    // Test login
    console.log('1. Testing login...');
    const loginResponse = await axios.post(`${BASE_URL}/api/login`, {
      username: 'demo@codeastra.com',
      password: 'password'
    });
    console.log('✅ Login successful:', loginResponse.data);
    
    const token = loginResponse.data.token;

    // Test protected route
    console.log('\n2. Testing protected route...');
    const meResponse = await axios.get(`${BASE_URL}/api/me`, {
      headers: { 'x-auth-token': token }
    });
    console.log('✅ User profile:', meResponse.data);

    // Test code review (if GOOGLE_GEMINI_KEY is set)
    console.log('\n3. Testing code review...');
    const reviewResponse = await axios.post(`${BASE_URL}/api/review`, {
      code: 'function hello() { console.log("Hello World"); }'
    });
    console.log('✅ Code review:', reviewResponse.data.review.substring(0, 100) + '...');

    console.log('\n🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAPI();