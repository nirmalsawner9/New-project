import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  Trash2,
  CheckCircle
} from 'lucide-react';
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

interface PostCardProps {
  post: Post;
  onUpdate: (post: Post) => void;
  onDelete: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commenting, setCommenting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const isLiked = post.likes.some(like => like.user === user?.id);
  const isOwner = post.author._id === user?.id;

  const handleLike = async () => {
    try {
      const response = await axios.post(`/posts/${post._id}/like`);
      onUpdate(response.data.post);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommenting(true);
    try {
      const response = await axios.post(`/posts/${post._id}/comment`, {
        content: newComment.trim()
      });
      onUpdate(response.data.post);
      setNewComment('');
    } catch (error: any) {
      console.error('Error adding comment:', error);
      alert(error.response?.data?.message || 'Failed to add comment');
    } finally {
      setCommenting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/posts/${post._id}`);
        onDelete(post._id);
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return diffInMinutes < 1 ? 'just now' : `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${post.author.username}`}>
            {post.author.profilePicture ? (
              <img
                src={post.author.profilePicture}
                alt={post.author.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">
                  {post.author.fullName.charAt(0)}
                </span>
              </div>
            )}
          </Link>
          <div>
            <div className="flex items-center space-x-1">
              <Link
                to={`/profile/${post.author.username}`}
                className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
              >
                {post.author.fullName}
              </Link>
              {post.author.isVerified && (
                <CheckCircle size={16} className="text-primary-500" />
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>@{post.author.username}</span>
              <span>·</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <MoreHorizontal size={20} className="text-gray-500" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={handleDelete}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-3" />
                  Delete post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className="mb-4">
          <div className={`grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000${image}`}
                alt={`Post image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between py-2 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium">{post.likeCount}</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 hover:text-primary-500 transition-colors"
          >
            <MessageCircle size={20} />
            <span className="text-sm font-medium">{post.commentCount}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
            <Share size={20} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {/* Add Comment */}
          <form onSubmit={handleComment} className="mb-4">
            <div className="flex space-x-3">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs">
                    {user?.fullName?.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={!newComment.trim() || commenting}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {commenting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    'Post'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment._id} className="flex space-x-3">
                <Link to={`/profile/${comment.user.username}`}>
                  {comment.user.profilePicture ? (
                    <img
                      src={comment.user.profilePicture}
                      alt={comment.user.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs">
                        {comment.user.fullName.charAt(0)}
                      </span>
                    </div>
                  )}
                </Link>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <Link
                      to={`/profile/${comment.user.username}`}
                      className="font-medium text-sm text-gray-900 hover:text-primary-600 transition-colors"
                    >
                      {comment.user.fullName}
                    </Link>
                    <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 ml-3 mt-1 block">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default PostCard;