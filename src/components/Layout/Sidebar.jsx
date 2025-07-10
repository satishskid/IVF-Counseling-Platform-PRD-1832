import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiUsers, FiClipboard, FiTrendingUp, FiSettings, FiHelpCircle } = FiIcons;

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'patients', label: 'Patients', icon: FiUsers },
    { id: 'assessments', label: 'Assessments', icon: FiClipboard },
    { id: 'analytics', label: 'Analytics', icon: FiTrendingUp },
    { id: 'settings', label: 'Settings', icon: FiSettings },
    { id: 'help', label: 'Help', icon: FiHelpCircle },
  ];

  return (
    <motion.aside 
      className="w-64 bg-white shadow-sm border-r border-blue-100 min-h-screen"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-l-4 border-blue-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <SafeIcon icon={item.icon} className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;