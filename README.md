# Social.M

A modern social media platform built with React, TypeScript, Node.js, and MongoDB.

## Features

- 🔐 User authentication and registration
- 👤 User profiles with customizable bio and photos
- 📝 Create and share posts with text and images
- ❤️ Like and comment on posts
- 👥 Follow/unfollow users
- 🔍 Search and discover users
- 📱 Responsive design with modern UI
- ⚡ Real-time features with Socket.IO
- 🎨 Beautiful UI with Tailwind CSS

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Socket.IO client for real-time features
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Socket.IO for real-time features
- Multer for file uploads
- bcryptjs for password hashing

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository and install dependencies:
```bash
npm run install-all
```

2. Set up environment variables:
```bash
# Copy and edit the server environment file
cp server/.env.example server/.env
```

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Start the development servers:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

## Project Structure

```
social-m/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── ...
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── uploads/           # File uploads
└── package.json           # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/:userId/follow` - Follow/unfollow user
- `GET /api/users/search/:query` - Search users
- `GET /api/users/suggestions/users` - Get suggested users

### Posts
- `POST /api/posts` - Create new post
- `GET /api/posts/feed` - Get user feed
- `GET /api/posts/:postId` - Get single post
- `POST /api/posts/:postId/like` - Like/unlike post
- `POST /api/posts/:postId/comment` - Add comment
- `DELETE /api/posts/:postId` - Delete post

### Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images

## Development

### Backend Development
```bash
cd server
npm run dev
```

### Frontend Development
```bash
cd client
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details