#!/bin/bash

echo "🚀 Setting up AI Resume Analyzer..."

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "🐳 Building Docker image..."
docker build -t resume-analyzer-backend .

echo "⚙️ Starting application using Docker Compose..."
cd ..
docker-compose up --build