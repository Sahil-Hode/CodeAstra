const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Original routes
app.use('/ai', aiRoutes);
app.use('/auth', authRoutes);

// API routes for Vercel compatibility
app.use('/api', authRoutes);
app.post('/api/review', (req, res) => {
  // Forward to AI controller
  const aiController = require('./controllers/ai.controller');
  aiController.getReview(req, res);
});

module.exports = app;