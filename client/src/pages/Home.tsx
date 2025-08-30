import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import SuggestedUsers from '../components/SuggestedUsers';
import axios from 'axios';

interface Post {
  _id: string;
  author: {
    _id: string;
    username: string;
    fullName: string;
    profilePicture?: string;
    isVerified?: boolean;
  };
  content: string;
  images?: string[];
  likes: Array<{ user: string; createdAt: string }>;
  comments: Array<{
    _id: string;
    user: {
      _id: string;
      username: string;
      fullName: string;
      profilePicture?: string;
    };
    content: string;
    createdAt: string;
  }>;
  createdAt: string;
  likeCount: number;
  commentCount: number;
}

const Home: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/posts/feed');
      setPosts(response.data);
    } catch (err: any) {
      setError('Failed to load feed');
      console.error('Error fetching feed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(prev => 
      prev.map(post => 
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  const handlePostDelete = (postId: string) => {
    setPosts(prev => prev.filter(post => post._id !== postId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <CreatePost onPostCreated={handleNewPost} />

          {/* Feed */}
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
                {error}
                <button 
                  onClick={fetchFeed}
                  className="ml-2 text-red-700 underline hover:text-red-800"
                >
                  Try again
                </button>
              </div>
            )}

            {posts.length === 0 && !loading && !error ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Welcome to Social.M!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your feed is empty. Start by following some users or create your first post!
                </p>
                <CreatePost onPostCreated={handleNewPost} />
              </div>
            ) : (
              posts.map(post => (
                <PostCard
                  key={post._id}
                  post={post}
                  onUpdate={handlePostUpdate}
                  onDelete={handlePostDelete}
                />
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {user?.fullName?.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-medium text-gray-900">{user?.fullName}</h3>
                <p className="text-sm text-gray-500">@{user?.username}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-900">{user?.followerCount || 0}</div>
                <div className="text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">{user?.followingCount || 0}</div>
                <div className="text-gray-500">Following</div>
              </div>
            </div>
          </div>

          {/* Suggested Users */}
          <SuggestedUsers />
        </div>
      </div>
    </div>
  );
};

export default Home;