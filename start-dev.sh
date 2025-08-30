#!/bin/bash

echo "🚀 Starting Social.M Development Environment..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "📊 MongoDB not detected. Please start MongoDB first:"
    echo "   sudo systemctl start mongod"
    echo "   OR"
    echo "   mongod --dbpath /path/to/your/db"
    echo ""
    echo "⚠️  Continuing anyway - make sure MongoDB is available..."
fi

echo "🔧 Starting development servers..."
npm run dev