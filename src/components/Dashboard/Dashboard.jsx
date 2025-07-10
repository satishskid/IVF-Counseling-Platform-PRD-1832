import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from './StatsCard';
import RecentPatients from './RecentPatients';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiClipboard, FiTrendingUp, FiHeart } = FiIcons;

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Patients',
      value: '124',
      icon: FiUsers,
      change: '+12%',
      changeType: 'positive',
      color: 'blue'
    },
    {
      title: 'Active Sessions',
      value: '18',
      icon: FiClipboard,
      change: '+5%',
      changeType: 'positive',
      color: 'purple'
    },
    {
      title: 'Success Rate',
      value: '85%',
      icon: FiTrendingUp,
      change: '+3%',
      changeType: 'positive',
      color: 'green'
    },
    {
      title: 'Avg. Wellness Score',
      value: '7.2',
      icon: FiHeart,
      change: '+0.5',
      changeType: 'positive',
      color: 'orange'
    }
  ];

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, Dr. Counselor! 👋
        </h2>
        <p className="text-gray-600">
          You have 5 sessions scheduled today. Let's help your patients on their journey.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2">
          <RecentPatients />
        </div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium">
              New Patient Assessment
            </button>
            <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium">
              Create Intervention Plan
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium">
              View Analytics
            </button>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Assessment completed for Priya Sharma</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Intervention plan updated for Anita Patel</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">New patient registered: Meera Reddy</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;