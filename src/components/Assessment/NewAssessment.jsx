import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import AssessmentForm from './AssessmentForm';

const { FiArrowLeft, FiSave, FiCheck } = FiIcons;

const NewAssessment = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { getPatientById, addAssessment } = useApp();
  
  const [patient, setPatient] = useState(null);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);
  
  useEffect(() => {
    if (patientId) {
      const foundPatient = getPatientById(patientId);
      if (foundPatient) {
        setPatient(foundPatient);
      } else {
        navigate('/patients');
      }
    }
  }, [patientId, getPatientById, navigate]);
  
  const handleAssessmentComplete = (formData) => {
    // Save assessment to context
    const newAssessment = addAssessment(parseInt(patientId), formData);
    setAssessmentResult(newAssessment);
    setAssessmentComplete(true);
  };
  
  const handleCreatePlan = () => {
    navigate(`/plans/new/${patientId}?assessmentId=${assessmentResult.id}`);
  };
  
  const handleBackToPatient = () => {
    navigate(`/patients/${patientId}`);
  };
  
  if (!patient) {
    return (
      <div className="p-6 text-center">
        <p>Loading patient data...</p>
      </div>
    );
  }
  
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
          onClick={() => navigate(`/patients/${patientId}`)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <SafeIcon icon={FiArrowLeft} className="h-5 w-5 text-gray-500" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {assessmentComplete ? 'Assessment Complete' : 'New Assessment'}
          </h2>
          <p className="text-gray-600">
            {assessmentComplete 
              ? `Assessment score: ${assessmentResult.score}/100`
              : `Patient: ${patient.name}`
            }
          </p>
        </div>
      </div>
      
      {assessmentComplete ? (
        <div className="space-y-6">
          {/* Success Message */}
          <motion.div
            className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <SafeIcon icon={FiCheck} className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-green-800">Assessment Completed Successfully</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>The patient assessment has been saved and is now available for review.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Assessment Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Patient Name</p>
                <p className="text-base text-gray-900">{assessmentResult.data.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Assessment Date</p>
                <p className="text-base text-gray-900">{assessmentResult.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">IVF Stage</p>
                <p className="text-base text-gray-900">{assessmentResult.data.ivfStage}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Anxiety Level</p>
                <p className="text-base text-gray-900 capitalize">{assessmentResult.data.anxietyLevel}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Treatment Cost</p>
                <p className="text-base text-gray-900">{assessmentResult.data.treatmentCost}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Assessment Score</p>
                <p className="text-base text-gray-900">{assessmentResult.score}/100</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="text-base font-medium text-gray-900 mb-2">AI Insights</h4>
              <div className="space-y-2">
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <p className="text-sm text-gray-700">
                    <strong>Key Concern:</strong> {
                      assessmentResult.data.anxietyLevel === 'high' 
                        ? 'High anxiety levels indicate need for immediate emotional support.' 
                        : assessmentResult.data.anxietyLevel === 'moderate'
                        ? 'Moderate anxiety suggests implementing regular coping mechanisms.'
                        : 'Low anxiety indicates good emotional adjustment.'
                    }
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <p className="text-sm text-gray-700">
                    <strong>Recommendation:</strong> {
                      assessmentResult.data.ivfStage === 'Waiting Period'
                        ? 'Focus on mindfulness techniques to manage waiting period anxiety.'
                        : assessmentResult.data.ivfStage === 'Embryo Transfer'
                        ? 'Consider post-transfer care plan with physical and emotional components.'
                        : 'Provide educational resources specific to current treatment stage.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={handleCreatePlan}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiSave} className="h-4 w-4" />
              <span>Create Intervention Plan</span>
            </button>
            
            <button
              onClick={handleBackToPatient}
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Back to Patient Profile
            </button>
          </div>
        </div>
      ) : (
        <AssessmentForm 
          initialData={{
            name: patient.name,
            age: patient.age.toString(),
            location: patient.location,
          }}
          onComplete={handleAssessmentComplete}
        />
      )}
    </motion.div>
  );
};

export default NewAssessment;