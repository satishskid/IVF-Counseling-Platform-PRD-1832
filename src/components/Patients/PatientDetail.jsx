import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import PatientProgressChart from './PatientProgressChart';

const {
  FiArrowLeft,
  FiUser,
  FiCalendar,
  FiClock,
  FiPhone,
  FiMail,
  FiFileText,
  FiClipboard,
  FiActivity,
  FiPlus
} = FiIcons;

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPatientById, assessments, plans } = useApp();
  
  const [patient, setPatient] = useState(null);
  const [patientAssessments, setPatientAssessments] = useState([]);
  const [patientPlans, setPatientPlans] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const foundPatient = getPatientById(id);
    if (foundPatient) {
      setPatient(foundPatient);
      
      // Get patient assessments
      const patientAssessments = assessments.filter(assessment => assessment.patientId === foundPatient.id);
      setPatientAssessments(patientAssessments);
      
      // Get patient plans
      const patientPlans = plans.filter(plan => plan.patientId === foundPatient.id);
      setPatientPlans(patientPlans);
    } else {
      navigate('/patients');
    }
  }, [id, getPatientById, navigate, assessments, plans]);
  
  if (!patient) {
    return (
      <div className="p-6 text-center">
        <p>Loading patient data...</p>
      </div>
    );
  }
  
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
      case 'Egg Retrieval': return 'bg-indigo-100 text-indigo-800';
      case 'Embryo Transfer': return 'bg-orange-100 text-orange-800';
      case 'Waiting Period': return 'bg-teal-100 text-teal-800';
      case 'Result Follow-up': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const renderOverview = () => {
    return (
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-base text-gray-900">{patient.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p className="text-base text-gray-900">{patient.age} years</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-base text-gray-900">{patient.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact</p>
              <div className="flex items-center space-x-3">
                <a href={`tel:${patient.phone}`} className="text-blue-600 hover:text-blue-800">
                  <SafeIcon icon={FiPhone} className="h-4 w-4" />
                </a>
                <a href={`mailto:${patient.email}`} className="text-blue-600 hover:text-blue-800">
                  <SafeIcon icon={FiMail} className="h-4 w-4" />
                </a>
                <span className="text-sm text-gray-500">{patient.phone}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Treatment Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Information</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">IVF Stage:</span>
              <span className={`px-2 py-1 text-xs rounded-full ${getStageColor(patient.stage)}`}>
                {patient.stage}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Risk Level:</span>
              <span className={`px-2 py-1 text-xs rounded-full border ${getRiskColor(patient.riskLevel)}`}>
                {patient.riskLevel} risk
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
        </div>
        
        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Progress Overview</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
          </div>
          
          <PatientProgressChart 
            progressData={patient.progress || []} 
            height={200} 
          />
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate(`/assessments/new/${patient.id}`)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiClipboard} className="h-4 w-4" />
            <span>New Assessment</span>
          </button>
          
          <button 
            onClick={() => navigate(`/plans/new/${patient.id}`)}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiFileText} className="h-4 w-4" />
            <span>Create Plan</span>
          </button>
          
          <button 
            onClick={() => navigate(`/progress/add/${patient.id}`)}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiActivity} className="h-4 w-4" />
            <span>Add Progress Note</span>
          </button>
        </div>
      </div>
    );
  };
  
  const renderAssessments = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Assessments</h3>
          <button 
            onClick={() => navigate(`/assessments/new/${patient.id}`)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="h-4 w-4" />
            <span>New Assessment</span>
          </button>
        </div>
        
        {patientAssessments.length > 0 ? (
          <div className="space-y-4">
            {patientAssessments.map((assessment) => (
              <motion.div 
                key={assessment.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
                whileHover={{ scale: 1.01 }}
                onClick={() => navigate(`/assessments/${assessment.id}`)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiClipboard} className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Assessment #{assessment.id}</h4>
                      <p className="text-sm text-gray-500">
                        <SafeIcon icon={FiCalendar} className="inline h-3 w-3 mr-1" />
                        {assessment.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-gray-500">Score:</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      assessment.score >= 75 ? 'bg-green-100 text-green-800' :
                      assessment.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {assessment.score}/100
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Stage</p>
                    <p className="text-gray-900">{assessment.data.ivfStage}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Anxiety Level</p>
                    <p className="text-gray-900 capitalize">{assessment.data.anxietyLevel}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Treatment Cost</p>
                    <p className="text-gray-900">{assessment.data.treatmentCost}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <SafeIcon icon={FiClipboard} className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No assessments yet</h4>
            <p className="text-gray-500 mb-4">Conduct a new assessment to track patient's progress.</p>
            <button 
              onClick={() => navigate(`/assessments/new/${patient.id}`)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <SafeIcon icon={FiPlus} className="h-4 w-4" />
              <span>New Assessment</span>
            </button>
          </div>
        )}
      </div>
    );
  };
  
  const renderPlans = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Intervention Plans</h3>
          <button 
            onClick={() => navigate(`/plans/new/${patient.id}`)}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="h-4 w-4" />
            <span>Create Plan</span>
          </button>
        </div>
        
        {patientPlans.length > 0 ? (
          <div className="space-y-4">
            {patientPlans.map((plan) => (
              <motion.div 
                key={plan.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
                whileHover={{ scale: 1.01 }}
                onClick={() => navigate(`/plans/${plan.id}`)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiFileText} className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">{plan.title}</h4>
                      <p className="text-sm text-gray-500">
                        <SafeIcon icon={FiCalendar} className="inline h-3 w-3 mr-1" />
                        {plan.date}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                      Follow-up: {plan.followUpDate}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Goals:</h5>
                  <ul className="text-sm text-gray-900 space-y-1">
                    {plan.goals.map((goal, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 flex-shrink-0">•</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-blue-600">
                    View complete plan and track progress
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <SafeIcon icon={FiFileText} className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No intervention plans yet</h4>
            <p className="text-gray-500 mb-4">Create a personalized intervention plan based on assessments.</p>
            <button 
              onClick={() => navigate(`/plans/new/${patient.id}`)}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <SafeIcon icon={FiPlus} className="h-4 w-4" />
              <span>Create Plan</span>
            </button>
          </div>
        )}
      </div>
    );
  };
  
  const renderProgress = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Progress Tracking</h3>
          <button 
            onClick={() => navigate(`/progress/add/${patient.id}`)}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="h-4 w-4" />
            <span>Add Progress Note</span>
          </button>
        </div>
        
        {patient.progress && patient.progress.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-base font-medium text-gray-900 mb-4">Wellness Score Trend</h4>
              <PatientProgressChart 
                progressData={patient.progress} 
                height={300} 
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-base font-medium text-gray-900 mb-4">Progress Timeline</h4>
              <div className="space-y-6">
                {patient.progress.map((entry, index) => (
                  <div key={index} className="relative">
                    {index !== patient.progress.length - 1 && (
                      <div className="absolute top-5 left-4 w-0.5 h-full bg-gray-200 z-0"></div>
                    )}
                    <div className="flex items-start space-x-4 relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        entry.wellnessScore >= 7 ? 'bg-green-100 text-green-700' :
                        entry.wellnessScore >= 5 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        <span className="text-xs font-medium">{entry.wellnessScore}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-medium text-gray-900">
                            Wellness Check
                          </h5>
                          <span className="text-xs text-gray-500">{entry.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {entry.wellnessScore >= 7
                            ? 'Patient reported positive emotional state with good coping mechanisms.'
                            : entry.wellnessScore >= 5
                            ? 'Patient reported moderate stress levels with some coping challenges.'
                            : 'Patient reported high stress and anxiety levels requiring intervention.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <SafeIcon icon={FiActivity} className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No progress data yet</h4>
            <p className="text-gray-500 mb-4">Track the patient's wellness journey with regular check-ins.</p>
            <button 
              onClick={() => navigate(`/progress/add/${patient.id}`)}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <SafeIcon icon={FiPlus} className="h-4 w-4" />
              <span>Add Progress Note</span>
            </button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with back button */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate('/patients')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <SafeIcon icon={FiArrowLeft} className="h-5 w-5 text-gray-500" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>{patient.age} years</span>
            <span>•</span>
            <span>{patient.location}</span>
            <span>•</span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${getRiskColor(patient.riskLevel)}`}>
              {patient.riskLevel} risk
            </span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'assessments', label: 'Assessments' },
            { id: 'plans', label: 'Intervention Plans' },
            { id: 'progress', label: 'Progress' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'assessments' && renderAssessments()}
        {activeTab === 'plans' && renderPlans()}
        {activeTab === 'progress' && renderProgress()}
      </div>
    </motion.div>
  );
};

export default PatientDetail;