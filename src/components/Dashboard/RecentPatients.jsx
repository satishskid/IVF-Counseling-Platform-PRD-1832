import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiClock, FiAlertCircle } = FiIcons;

const RecentPatients = () => {
  const patients = [
    {
      id: 1,
      name: 'Priya Sharma',
      stage: 'Embryo Transfer',
      lastSession: '2 hours ago',
      riskLevel: 'medium',
      nextAppointment: 'Today 3:00 PM'
    },
    {
      id: 2,
      name: 'Anita Patel',
      stage: 'Waiting Period',
      lastSession: '1 day ago',
      riskLevel: 'high',
      nextAppointment: 'Tomorrow 10:00 AM'
    },
    {
      id: 3,
      name: 'Meera Reddy',
      stage: 'Ovarian Stimulation',
      lastSession: '3 days ago',
      riskLevel: 'low',
      nextAppointment: 'Dec 28, 2:00 PM'
    },
    {
      id: 4,
      name: 'Kavya Nair',
      stage: 'Initial Consultation',
      lastSession: '5 days ago',
      riskLevel: 'medium',
      nextAppointment: 'Dec 30, 11:00 AM'
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Patients</h3>
      <div className="space-y-4">
        {patients.map((patient, index) => (
          <motion.div
            key={patient.id}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(patient.riskLevel)}`}>
                  {patient.riskLevel} risk
                </span>
              </div>
              <p className="text-sm text-gray-500">{patient.stage}</p>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiClock} className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{patient.lastSession}</span>
                </div>
                <span className="text-xs text-blue-600 font-medium">{patient.nextAppointment}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentPatients;