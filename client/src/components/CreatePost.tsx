import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Image, Send, X } from 'lucide-react';
import axios from 'axios';

interface CreatePostProps {
  onPostCreated: (post: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('/posts', {
        content: content.trim(),
        images
      });
      
      onPostCreated(response.data.post);
      setContent('');
      setImages([]);
    } catch (error: any) {
      console.error('Error creating post:', error);
      alert(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const response = await axios.post('/upload/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setImages(prev => [...prev, ...response.data.urls]);
    } catch (error: any) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">
                {user?.fullName?.charAt(0)}
              </span>
            </div>
          )}
          
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              rows={3}
              maxLength={2000}
            />
            
            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={`http://localhost:5000${image}`}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer text-primary-600 hover:text-primary-700 transition-colors">
                  <Image size={20} />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                {uploading && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  {content.length}/2000
                </span>
                <button
                  type="submit"
                  disabled={!content.trim() || loading || uploading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Post</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;