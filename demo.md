# Social.M Demo Guide

## Getting Started

### 1. Start the Application

First, make sure MongoDB is running on your system, then:

```bash
npm run dev
```

This will start both the backend (port 5000) and frontend (port 3000).

### 2. Create Your First Account

1. Navigate to http://localhost:3000
2. Click "Sign up for Social.M"
3. Fill in your details:
   - Full Name: John Doe
   - Username: johndoe
   - Email: john@example.com
   - Password: password123

### 3. Explore the Features

#### Create Your First Post
1. On the home page, use the "What's on your mind?" box
2. Type something like: "Hello Social.M! Excited to be here! #firstpost #socialmedia"
3. Optionally add images by clicking the image icon
4. Click "Post"

#### Follow Other Users
1. Go to the Explore page (search icon in navbar)
2. Search for users or browse suggested users
3. Click "Follow" on users you want to connect with

#### Interact with Posts
- ❤️ Like posts by clicking the heart icon
- 💬 Comment on posts by clicking the comment icon
- 🔄 Share posts (feature can be extended)

#### Customize Your Profile
1. Click on your profile picture in the navbar
2. Select "My Profile"
3. Click "Edit Profile" to update your bio, profile picture, etc.

### 4. Real-time Features

The app includes real-time capabilities:
- Live notifications (when implemented)
- Real-time comments and likes
- Online user status

## Sample Data

Here are some sample users you can create for testing:

1. **Tech Enthusiast**
   - Name: Sarah Tech
   - Username: sarahtech
   - Bio: "Full-stack developer passionate about React and Node.js"

2. **Creative Artist**
   - Name: Alex Creative
   - Username: alexcreative
   - Bio: "Digital artist sharing my latest creations"

3. **Travel Blogger**
   - Name: Mike Explorer
   - Username: mikeexplorer
   - Bio: "Exploring the world one city at a time ✈️"

## Testing Scenarios

### User Authentication
- ✅ Register new account
- ✅ Login with existing account
- ✅ Logout functionality
- ✅ Protected routes

### Social Features
- ✅ Create posts with text and images
- ✅ Like/unlike posts
- ✅ Comment on posts
- ✅ Follow/unfollow users
- ✅ View user profiles
- ✅ Search for users

### UI/UX
- ✅ Responsive design
- ✅ Modern, clean interface
- ✅ Smooth animations and transitions
- ✅ Loading states
- ✅ Error handling

## Next Steps for Enhancement

1. **Notifications System**
   - Push notifications for likes, comments, follows
   - In-app notification center

2. **Advanced Features**
   - Direct messaging
   - Story feature
   - Video uploads
   - Post scheduling

3. **Content Discovery**
   - Hashtag pages
   - Trending topics
   - Recommended posts algorithm

4. **Security & Performance**
   - Rate limiting
   - Image optimization
   - Caching strategies
   - Content moderation

5. **Mobile App**
   - React Native version
   - Push notifications
   - Offline support