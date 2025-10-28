# CodeAstra Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Environment Variables
Set these in your Vercel dashboard:
```
JWT_SECRET=your-super-secret-jwt-key-here
GOOGLE_GEMINI_KEY=your-google-gemini-api-key-here
```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Test Endpoints
After deployment, test these endpoints:
- `POST /api/login` - Login with demo@codeastra.com / password
- `POST /api/signup` - Create new account
- `GET /api/me` - Get user profile (requires x-auth-token header)
- `POST /api/review` - AI code review (requires code in body)

## 📁 Project Structure
```
CodeAstra/
├── api/                    # Vercel serverless functions
│   ├── login.js           # Authentication endpoint
│   ├── signup.js          # User registration
│   ├── me.js              # User profile
│   └── review.js          # AI code review
├── client/                # React frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── vercel.json            # Vercel configuration
├── package.json           # Root dependencies
└── .env.example           # Environment template
```

## 🔧 Local Development
```bash
# Install dependencies
npm install
cd client && npm install

# Start development server
cd client && npm run dev

# The frontend will proxy API calls to /api/* during development
```

## 🌐 Production URLs
- Frontend: `https://your-app.vercel.app`
- API: `https://your-app.vercel.app/api/*`

## 📝 Demo Credentials
- Username: `demo@codeastra.com`
- Password: `password`