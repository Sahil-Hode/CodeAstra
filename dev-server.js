const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Import API handlers
const login = require('./api/login.js');
const signup = require('./api/signup.js');
const me = require('./api/me.js');
const review = require('./api/review.js');

// API routes
app.post('/api/login', (req, res) => login.default(req, res));
app.post('/api/signup', (req, res) => signup.default(req, res));
app.get('/api/me', (req, res) => me.default(req, res));
app.post('/api/review', (req, res) => review.default(req, res));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});