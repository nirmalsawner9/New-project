import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import { 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Settings, 
  UserPlus, 
  UserMinus,
  CheckCircle
} from 'lucide-react';
import axios from 'axios';

interface ProfileUser {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  coverPhoto?: string;
  followerCount: number;
  followingCount: number;
  isVerified?: boolean;
  createdAt: string;
  followers: Array<{ _id: string; username: string; fullName: string }>;
  following: Array<{ _id: string; username: string; fullName: string }>;
}

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

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    if (username) {
      fetchProfile();
    }
  }, [username]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/users/${username}`);
      setProfileUser(response.data.user);
      setPosts(response.data.posts);
      
      // Check if current user is following this profile
      if (currentUser && response.data.user.followers) {
        setIsFollowing(
          response.data.user.followers.some((follower: any) => follower._id === currentUser.id)
        );
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!profileUser) return;
    
    setFollowLoading(true);
    try {
      const response = await axios.post(`/users/${profileUser._id}/follow`);
      setIsFollowing(response.data.isFollowing);
      
      // Update follower count
      setProfileUser(prev => prev ? {
        ...prev,
        followerCount: response.data.isFollowing 
          ? prev.followerCount + 1 
          : prev.followerCount - 1
      } : null);
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    } finally {
      setFollowLoading(false);
    }
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

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">User not found</h2>
          <p className="text-gray-600 mt-2">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cover Photo */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-primary-400 to-primary-600 rounded-t-xl">
          {profileUser.coverPhoto && (
            <img
              src={profileUser.coverPhoto}
              alt="Cover"
              className="w-full h-48 object-cover rounded-t-xl"
            />
          )}
        </div>
        
        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-8">
          {profileUser.profilePicture ? (
            <img
              src={profileUser.profilePicture}
              alt={profileUser.fullName}
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center">
              <span className="text-gray-600 text-3xl font-medium">
                {profileUser.fullName.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 pt-20 pb-6 px-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{profileUser.fullName}</h1>
              {profileUser.isVerified && (
                <CheckCircle size={24} className="text-primary-500" />
              )}
            </div>
            <p className="text-gray-600 mb-3">@{profileUser.username}</p>
            
            {profileUser.bio && (
              <p className="text-gray-700 mb-4">{profileUser.bio}</p>
            )}
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>Joined {formatJoinDate(profileUser.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div>
                <span className="font-semibold text-gray-900">{profileUser.followingCount}</span>
                <span className="text-gray-500 ml-1">Following</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">{profileUser.followerCount}</span>
                <span className="text-gray-500 ml-1">Followers</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {isOwnProfile ? (
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Settings size={16} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <button
                onClick={handleFollow}
                disabled={followLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isFollowing
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {followLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : (
                  <>
                    {isFollowing ? <UserMinus size={16} /> : <UserPlus size={16} />}
                    <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Posts ({posts.length})
        </h2>
        
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isOwnProfile ? "You haven't posted anything yet" : `${profileUser.fullName} hasn't posted anything yet`}
            </h3>
            <p className="text-gray-600">
              {isOwnProfile ? "Share your first post to get started!" : "Check back later for new posts."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard
                key={post._id}
                post={post}
                onUpdate={handlePostUpdate}
                onDelete={handlePostDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;