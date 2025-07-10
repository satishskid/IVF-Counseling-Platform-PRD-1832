import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiClock, FiPhone, FiMail, FiAlertCircle } = FiIcons;

const PatientCard = ({ patient, onClick }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Initial Consultation': return 'bg-blue-100 text-blue-800';
      case 'Ovarian Stimulation': return 'bg-purple-100 text-purple-800';
      case 'Embryo Transfer': return 'bg-orange-100 text-orange-800';
      case 'Waiting Period': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiUser} className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-500">{patient.age} years • {patient.location}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full border ${getRiskColor(patient.riskLevel)}`}>
            {patient.riskLevel} risk
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">IVF Stage:</span>
          <span className={`px-2 py-1 text-xs rounded-full ${getStageColor(patient.stage)}`}>
            {patient.stage}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Treatment Cost:</span>
          <span className="text-sm font-semibold text-blue-600">{patient.treatmentCost}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Last Session:</span>
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiClock} className="h-3 w-3 text-gray-400" />
            <span className="text-sm text-gray-500">{patient.lastSession}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Next Appointment:</span>
          <span className="text-sm font-medium text-green-600">{patient.nextAppointment}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-blue-600 hover:text-blue-700 transition-colors">
              <SafeIcon icon={FiPhone} className="h-4 w-4" />
            </button>
            <button className="text-blue-600 hover:text-blue-700 transition-colors">
              <SafeIcon icon={FiMail} className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientCard;