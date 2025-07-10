import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import PatientList from './components/Patients/PatientList';
import AssessmentForm from './components/Assessment/AssessmentForm';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user] = useState({
    name: 'Dr. Priya Counselor',
    role: 'Clinical Psychologist',
    clinic: 'Delhi IVF Center'
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientList />;
      case 'assessments':
        return <AssessmentForm />;
      case 'analytics':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Advanced analytics and reporting features coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-600">Clinic customization and configuration options coming soon...</p>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Help & Support</h3>
              <p className="text-gray-600">Documentation and support resources coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user}
        onProfileClick={() => console.log('Profile clicked')}
        onLogout={() => console.log('Logout clicked')}
      />
      
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;