import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Search, 
  Bell, 
  MessageCircle, 
  User, 
  LogOut,
  Settings
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S.M</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">Social.M</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className={`p-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Home"
            >
              <Home size={24} />
            </Link>
            
            <Link
              to="/explore"
              className={`p-2 rounded-lg transition-colors ${
                isActive('/explore') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Explore"
            >
              <Search size={24} />
            </Link>
            
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <MessageCircle size={24} />
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={16} className="text-gray-600" />
                </div>
              )}
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {user?.fullName}
              </span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <Link
                  to={`/profile/${user?.username}`}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <User size={16} className="mr-3" />
                  My Profile
                </Link>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings size={16} className="mr-3" />
                  Settings
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;