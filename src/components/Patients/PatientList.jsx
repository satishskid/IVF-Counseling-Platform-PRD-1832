import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PatientCard from './PatientCard';
import AddPatientModal from './AddPatientModal';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const { FiSearch, FiFilter, FiPlus, FiUsers } = FiIcons;

const PatientList = () => {
  const { patients } = useApp();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || patient.riskLevel === filterBy;
    return matchesSearch && matchesFilter;
  });

  const handlePatientClick = (patient) => {
    navigate(`/patients/${patient.id}`);
  };

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
          <p className="text-gray-600">Manage your patient counseling sessions</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="h-4 w-4" />
          <span>Add Patient</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients by name or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="h-5 w-5 text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiUsers} className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Total Patients</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{patients.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">Low Risk</span>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {patients.filter(p => p.riskLevel === 'low').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">Medium Risk</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {patients.filter(p => p.riskLevel === 'medium').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">High Risk</span>
          </div>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {patients.filter(p => p.riskLevel === 'high').length}
          </p>
        </div>
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PatientCard
              patient={patient}
              onClick={() => handlePatientClick(patient)}
            />
          </motion.div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiUsers} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or add a new patient.</p>
        </div>
      )}
      
      <AnimatePresence>
        {isAddModalOpen && (
          <AddPatientModal 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PatientList;