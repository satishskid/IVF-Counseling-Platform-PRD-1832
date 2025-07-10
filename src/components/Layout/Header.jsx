import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiUser, FiBell, FiSettings, FiLogOut } = FiIcons;

const Header = ({ user, onProfileClick, onLogout }) => {
  return (
    <motion.header 
      className="bg-white shadow-sm border-b border-blue-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <SafeIcon icon={FiHeart} className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Vibe
              </h1>
              <p className="text-xs text-gray-500">IVF Counseling Platform</p>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <SafeIcon icon={FiBell} className="h-5 w-5" />
            </button>
            <button 
              onClick={onProfileClick}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiUser} className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {user?.name || 'Dr. Counselor'}
              </span>
            </button>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <SafeIcon icon={FiLogOut} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;