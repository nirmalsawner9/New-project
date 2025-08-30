#!/bin/bash

echo "🚀 Setting up Social.M..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p server/uploads

echo "✅ Setup complete!"
echo ""
echo "🔧 To start development:"
echo "1. Make sure MongoDB is running"
echo "2. Copy server/.env.example to server/.env and update values"
echo "3. Run: npm run dev"
echo ""
echo "🌐 The app will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://localhost:5000"