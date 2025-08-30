import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, User, Hash, CheckCircle } from 'lucide-react';
import axios from 'axios';

interface TrendingUser {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
  isVerified?: boolean;
  followerCount?: number;
}

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TrendingUser[]>([]);
  const [trendingUsers, setTrendingUsers] = useState<TrendingUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    fetchTrendingUsers();
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const fetchTrendingUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/users/suggestions/users');
      setTrendingUsers(response.data);
    } catch (error) {
      console.error('Error fetching trending users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setSearchLoading(true);
      const response = await axios.get(`/users/search/${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const trendingHashtags = [
    '#socialmedia', '#technology', '#photography', '#travel', '#food',
    '#fitness', '#music', '#art', '#coding', '#lifestyle'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Explore Social.M</h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for users..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Search Results</h3>
            {searchLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              </div>
            ) : searchResults.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No users found for "{searchQuery}"</p>
            ) : (
              <div className="space-y-3">
                {searchResults.map(user => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp size={24} className="text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">Trending Users</h2>
          </div>
          
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 animate-pulse">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {trendingUsers.map(user => (
                <UserCard key={user._id} user={user} showFollowButton />
              ))}
            </div>
          )}
        </div>

        {/* Trending Hashtags */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Hash size={24} className="text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">Trending Hashtags</h2>
          </div>
          
          <div className="space-y-3">
            {trendingHashtags.map((hashtag, index) => (
              <div key={hashtag} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Hash size={16} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{hashtag}</p>
                    <p className="text-sm text-gray-500">{Math.floor(Math.random() * 1000) + 100} posts</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary-600">#{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface UserCardProps {
  user: TrendingUser;
  showFollowButton?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, showFollowButton = false }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      const response = await axios.post(`/users/${user._id}/follow`);
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <Link to={`/profile/${user.username}`}>
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
          )}
        </Link>
        <div>
          <div className="flex items-center space-x-1">
            <Link
              to={`/profile/${user.username}`}
              className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
            >
              {user.fullName}
            </Link>
            {user.isVerified && (
              <CheckCircle size={16} className="text-primary-500" />
            )}
          </div>
          <p className="text-sm text-gray-500">@{user.username}</p>
          {user.followerCount !== undefined && (
            <p className="text-xs text-gray-400">{user.followerCount} followers</p>
          )}
        </div>
      </div>
      
      {showFollowButton && (
        <button
          onClick={handleFollow}
          disabled={followLoading}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isFollowing
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          } disabled:opacity-50`}
        >
          {followLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          ) : (
            isFollowing ? 'Unfollow' : 'Follow'
          )}
        </button>
      )}
    </div>
  );
};

export default Explore;