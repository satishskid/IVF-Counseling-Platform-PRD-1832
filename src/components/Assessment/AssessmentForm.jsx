import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiHeart, FiDollarSign, FiMessageSquare, FiSave, FiChevronRight } = FiIcons;

const AssessmentForm = ({ initialData = {}, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Patient Info
    name: initialData.name || '',
    age: initialData.age || '',
    location: initialData.location || '',
    language: initialData.language || 'english',
    
    // Clinical Info
    ivfStage: initialData.ivfStage || '',
    cycleNumber: initialData.cycleNumber || '',
    previousAttempts: initialData.previousAttempts || '',
    
    // Emotional Assessment
    anxietyLevel: initialData.anxietyLevel || '',
    stressFactors: initialData.stressFactors || [],
    copingMechanisms: initialData.copingMechanisms || [],
    
    // Financial Assessment
    treatmentCost: initialData.treatmentCost || '',
    budgetConcerns: initialData.budgetConcerns || '',
    insuranceCoverage: initialData.insuranceCoverage || '',
    
    // Cultural Factors
    familySupport: initialData.familySupport || '',
    culturalConcerns: initialData.culturalConcerns || '',
    religiousBeliefs: initialData.religiousBeliefs || ''
  });

  const steps = [
    { id: 1, title: 'Patient Information', icon: FiUser },
    { id: 2, title: 'Clinical Assessment', icon: FiHeart },
    { id: 3, title: 'Emotional State', icon: FiMessageSquare },
    { id: 4, title: 'Financial Planning', icon: FiDollarSign }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    onComplete(formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter patient name"
                  readOnly={!!initialData.name}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Age"
                  readOnly={!!initialData.age}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State"
                  readOnly={!!initialData.location}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Language *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="tamil">Tamil</option>
                  <option value="bengali">Bengali</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Clinical Assessment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current IVF Stage *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Initial Consultation',
                    'Ovarian Stimulation',
                    'Egg Retrieval',
                    'Embryo Transfer',
                    'Waiting Period',
                    'Result Follow-up'
                  ].map((stage) => (
                    <label key={stage} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="ivfStage"
                        value={stage}
                        checked={formData.ivfStage === stage}
                        onChange={(e) => handleInputChange('ivfStage', e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{stage}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Cycle Number
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.cycleNumber}
                    onChange={(e) => handleInputChange('cycleNumber', e.target.value)}
                    placeholder="1, 2, 3..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Previous Attempts
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.previousAttempts}
                    onChange={(e) => handleInputChange('previousAttempts', e.target.value)}
                    placeholder="Number of previous attempts"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Emotional Assessment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Anxiety Level *
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: 'low', label: 'Low', color: 'green' },
                    { value: 'moderate', label: 'Moderate', color: 'yellow' },
                    { value: 'high', label: 'High', color: 'red' }
                  ].map((level) => (
                    <label key={level.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="anxietyLevel"
                        value={level.value}
                        checked={formData.anxietyLevel === level.value}
                        onChange={(e) => handleInputChange('anxietyLevel', e.target.value)}
                        className="text-blue-600"
                      />
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        level.color === 'green' ? 'bg-green-100 text-green-800' :
                        level.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {level.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Stress Factors (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Fear of treatment failure',
                    'Financial burden',
                    'Social stigma',
                    'Family pressure',
                    'Physical discomfort',
                    'Time constraints',
                    'Work-life balance',
                    'Relationship strain'
                  ].map((factor) => (
                    <label key={factor} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.stressFactors.includes(factor)}
                        onChange={() => handleArrayChange('stressFactors', factor)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{factor}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coping Mechanisms (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Meditation/Mindfulness',
                    'Physical exercise',
                    'Social support',
                    'Therapy/Counseling',
                    'Religious practices',
                    'Hobbies/Distraction',
                    'Journaling',
                    'Relaxation techniques'
                  ].map((mechanism) => (
                    <label key={mechanism} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.copingMechanisms.includes(mechanism)}
                        onChange={() => handleArrayChange('copingMechanisms', mechanism)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{mechanism}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Financial Planning</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treatment Cost Range *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    '₹1 - 1.5 lakh',
                    '₹1.5 - 2 lakh',
                    '₹2 - 3 lakh',
                    '₹3 - 4 lakh',
                    '₹4 - 5 lakh',
                    '₹5+ lakh'
                  ].map((range) => (
                    <label key={range} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="treatmentCost"
                        value={range}
                        checked={formData.treatmentCost === range}
                        onChange={(e) => handleInputChange('treatmentCost', e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Concerns Level
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: 'no-concern', label: 'No Concern' },
                    { value: 'moderate', label: 'Moderate' },
                    { value: 'high-concern', label: 'High Concern' }
                  ].map((level) => (
                    <label key={level.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="budgetConcerns"
                        value={level.value}
                        checked={formData.budgetConcerns === level.value}
                        onChange={(e) => handleInputChange('budgetConcerns', e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Coverage
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Full coverage',
                    'Partial coverage',
                    'No coverage',
                    'Pending approval'
                  ].map((coverage) => (
                    <label key={coverage} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="insuranceCoverage"
                        value={coverage}
                        checked={formData.insuranceCoverage === coverage}
                        onChange={(e) => handleInputChange('insuranceCoverage', e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{coverage}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <span className="text-sm">✓</span>
                  ) : (
                    <SafeIcon icon={step.icon} className="h-4 w-4" />
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-blue-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          <div className="flex space-x-3">
            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Next</span>
                <SafeIcon icon={FiChevronRight} className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2"
              >
                <SafeIcon icon={FiSave} className="h-4 w-4" />
                <span>Complete Assessment</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AI Suggestions Panel */}
      <motion.div
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-purple-900 mb-3">AI Suggestions</h3>
        <div className="space-y-2">
          <div className="bg-white rounded-lg p-3 border border-purple-200">
            <p className="text-sm text-gray-700">
              <strong>Meta Prompt:</strong> {
                currentStep === 2 && formData.ivfStage === 'Embryo Transfer'
                  ? 'For embryo transfer stage, consider asking about post-transfer anxiety and physical symptoms.'
                  : currentStep === 3 && formData.anxietyLevel === 'high'
                  ? 'High anxiety detected - explore specific triggers and existing support systems.'
                  : currentStep === 4 && formData.treatmentCost === '₹5+ lakh'
                  ? 'High treatment cost - consider financial counseling and payment plan options.'
                  : 'Based on patient profile, explore psychological and cultural factors affecting treatment.'
              }
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-purple-200">
            <p className="text-sm text-gray-700">
              <strong>Recommendation:</strong> {
                currentStep === 2
                  ? 'Document all previous IVF attempts and outcomes for comprehensive treatment history.'
                  : currentStep === 3
                  ? 'CBT approach suggested for anxiety management with mindfulness techniques.'
                  : currentStep === 4
                  ? 'Consider budget-friendly options and financial planning session if concerns are high.'
                  : 'Assess language preferences and cultural beliefs for personalized communication.'
              }
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AssessmentForm;