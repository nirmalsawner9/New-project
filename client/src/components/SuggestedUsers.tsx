import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, UserPlus } from 'lucide-react';
import axios from 'axios';

interface SuggestedUser {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
  isVerified?: boolean;
}

const SuggestedUsers: React.FC = () => {
  const [users, setUsers] = useState<SuggestedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  const fetchSuggestedUsers = async () => {
    try {
      const response = await axios.get('/users/suggestions/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching suggested users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string) => {
    try {
      setFollowingUsers(prev => new Set(prev).add(userId));
      await axios.post(`/users/${userId}/follow`);
      // Remove from suggestions after following
      setUsers(prev => prev.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error following user:', error);
      setFollowingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested for you</h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested for you</h3>
      <div className="space-y-3">
        {users.map((suggestedUser) => (
          <div key={suggestedUser._id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to={`/profile/${suggestedUser.username}`}>
                {suggestedUser.profilePicture ? (
                  <img
                    src={suggestedUser.profilePicture}
                    alt={suggestedUser.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                )}
              </Link>
              <div>
                <div className="flex items-center space-x-1">
                  <Link
                    to={`/profile/${suggestedUser.username}`}
                    className="font-medium text-sm text-gray-900 hover:text-primary-600 transition-colors"
                  >
                    {suggestedUser.fullName}
                  </Link>
                  {suggestedUser.isVerified && (
                    <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">@{suggestedUser.username}</p>
              </div>
            </div>
            <button
              onClick={() => handleFollow(suggestedUser._id)}
              disabled={followingUsers.has(suggestedUser._id)}
              className="flex items-center space-x-1 bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              <UserPlus size={14} />
              <span>{followingUsers.has(suggestedUser._id) ? 'Following...' : 'Follow'}</span>
            </button>
          </div>
        ))}
      </div>
      
      <Link
        to="/explore"
        className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium mt-4 transition-colors"
      >
        See all suggestions
      </Link>
    </div>
  );
};

export default SuggestedUsers;