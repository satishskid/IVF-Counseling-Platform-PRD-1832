import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AppContext = createContext();

// Sample data
const samplePatients = [
  {
    id: 1,
    name: 'Priya Sharma',
    age: 32,
    location: 'Mumbai',
    stage: 'Embryo Transfer',
    riskLevel: 'medium',
    treatmentCost: '₹2.5 lakh',
    lastSession: '2 hours ago',
    nextAppointment: 'Today 3:00 PM',
    phone: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    assessments: [{ id: 101, date: '2023-12-20', score: 72 }],
    plans: [{ id: 201, date: '2023-12-21', title: 'Post-Transfer Care Plan' }],
    progress: [
      { date: '2023-11-15', wellnessScore: 6.2 },
      { date: '2023-11-30', wellnessScore: 6.8 },
      { date: '2023-12-15', wellnessScore: 7.1 }
    ]
  },
  {
    id: 2,
    name: 'Anita Patel',
    age: 29,
    location: 'Delhi',
    stage: 'Waiting Period',
    riskLevel: 'high',
    treatmentCost: '₹1.8 lakh',
    lastSession: '1 day ago',
    nextAppointment: 'Tomorrow 10:00 AM',
    phone: '+91 98765 43211',
    email: 'anita.patel@email.com',
    assessments: [{ id: 102, date: '2023-12-18', score: 61 }],
    plans: [{ id: 202, date: '2023-12-19', title: 'Anxiety Management Plan' }],
    progress: [
      { date: '2023-11-10', wellnessScore: 5.1 },
      { date: '2023-11-25', wellnessScore: 5.4 },
      { date: '2023-12-10', wellnessScore: 5.9 }
    ]
  },
  {
    id: 3,
    name: 'Meera Reddy',
    age: 35,
    location: 'Bangalore',
    stage: 'Ovarian Stimulation',
    riskLevel: 'low',
    treatmentCost: '₹3.2 lakh',
    lastSession: '3 days ago',
    nextAppointment: 'Dec 28, 2:00 PM',
    phone: '+91 98765 43212',
    email: 'meera.reddy@email.com',
    assessments: [{ id: 103, date: '2023-12-15', score: 81 }],
    plans: [{ id: 203, date: '2023-12-16', title: 'Hormone Support Plan' }],
    progress: [
      { date: '2023-11-05', wellnessScore: 7.5 },
      { date: '2023-11-20', wellnessScore: 7.8 },
      { date: '2023-12-05', wellnessScore: 8.1 }
    ]
  },
  {
    id: 4,
    name: 'Kavya Nair',
    age: 28,
    location: 'Chennai',
    stage: 'Initial Consultation',
    riskLevel: 'medium',
    treatmentCost: '₹2.0 lakh',
    lastSession: '5 days ago',
    nextAppointment: 'Dec 30, 11:00 AM',
    phone: '+91 98765 43213',
    email: 'kavya.nair@email.com',
    assessments: [],
    plans: [],
    progress: [
      { date: '2023-12-15', wellnessScore: 6.5 }
    ]
  },
  {
    id: 5,
    name: 'Ritu Singh',
    age: 31,
    location: 'Pune',
    stage: 'Embryo Transfer',
    riskLevel: 'low',
    treatmentCost: '₹2.8 lakh',
    lastSession: '1 week ago',
    nextAppointment: 'Jan 2, 9:00 AM',
    phone: '+91 98765 43214',
    email: 'ritu.singh@email.com',
    assessments: [{ id: 105, date: '2023-12-10', score: 75 }],
    plans: [{ id: 205, date: '2023-12-12', title: 'Nutritional Support Plan' }],
    progress: [
      { date: '2023-11-01', wellnessScore: 7.0 },
      { date: '2023-11-15', wellnessScore: 7.2 },
      { date: '2023-12-01', wellnessScore: 7.4 }
    ]
  },
  {
    id: 6,
    name: 'Deepa Gupta',
    age: 34,
    location: 'Hyderabad',
    stage: 'Waiting Period',
    riskLevel: 'high',
    treatmentCost: '₹1.5 lakh',
    lastSession: '2 days ago',
    nextAppointment: 'Dec 29, 4:00 PM',
    phone: '+91 98765 43215',
    email: 'deepa.gupta@email.com',
    assessments: [{ id: 106, date: '2023-12-17', score: 58 }],
    plans: [{ id: 206, date: '2023-12-18', title: 'Stress Reduction Plan' }],
    progress: [
      { date: '2023-11-05', wellnessScore: 5.0 },
      { date: '2023-11-20', wellnessScore: 5.2 },
      { date: '2023-12-05', wellnessScore: 5.5 }
    ]
  }
];

const sampleAssessments = [
  {
    id: 101,
    patientId: 1,
    date: '2023-12-20',
    score: 72,
    data: {
      name: 'Priya Sharma',
      age: '32',
      location: 'Mumbai',
      language: 'english',
      ivfStage: 'Embryo Transfer',
      cycleNumber: '2',
      previousAttempts: '1',
      anxietyLevel: 'moderate',
      stressFactors: ['Fear of treatment failure', 'Financial burden'],
      treatmentCost: '₹2 - 3 lakh',
      budgetConcerns: 'moderate',
      insuranceCoverage: 'Partial coverage'
    }
  },
  {
    id: 102,
    patientId: 2,
    date: '2023-12-18',
    score: 61,
    data: {
      name: 'Anita Patel',
      age: '29',
      location: 'Delhi',
      language: 'hindi',
      ivfStage: 'Waiting Period',
      cycleNumber: '1',
      previousAttempts: '0',
      anxietyLevel: 'high',
      stressFactors: ['Fear of treatment failure', 'Social stigma', 'Family pressure'],
      treatmentCost: '₹1.5 - 2 lakh',
      budgetConcerns: 'high-concern',
      insuranceCoverage: 'No coverage'
    }
  }
];

const samplePlans = [
  {
    id: 201,
    patientId: 1,
    date: '2023-12-21',
    title: 'Post-Transfer Care Plan',
    assessmentId: 101,
    interventions: [
      {
        category: 'Mindfulness',
        activities: [
          'Daily 10-minute guided meditation',
          'Breathing exercises twice daily',
          'Positive visualization before bed'
        ],
        frequency: 'Daily',
        resources: ['Calm app subscription', 'Mindfulness workbook (PDF)']
      },
      {
        category: 'Physical Care',
        activities: [
          'Gentle walking for 15-20 minutes',
          'Adequate hydration (3L water daily)',
          'Balanced nutrition with focus on proteins'
        ],
        frequency: 'Daily',
        resources: ['Nutrition guide (PDF)', 'Exercise recommendations (PDF)']
      },
      {
        category: 'Emotional Support',
        activities: [
          'Weekly support group attendance',
          'Journal writing when anxious',
          'Scheduled relaxation time'
        ],
        frequency: 'As needed',
        resources: ['Support group contact', 'Journal prompts (PDF)']
      }
    ],
    goals: [
      'Reduce anxiety levels by 30%',
      'Improve sleep quality',
      'Develop healthy coping mechanisms'
    ],
    followUpDate: '2024-01-05'
  },
  {
    id: 202,
    patientId: 2,
    date: '2023-12-19',
    title: 'Anxiety Management Plan',
    assessmentId: 102,
    interventions: [
      {
        category: 'CBT Techniques',
        activities: [
          'Thought recording and challenging',
          'Cognitive restructuring exercises',
          'Behavioral activation'
        ],
        frequency: 'Daily',
        resources: ['CBT workbook (PDF)', 'Thought record template']
      },
      {
        category: 'Stress Reduction',
        activities: [
          'Progressive muscle relaxation',
          'Deep breathing exercises',
          'Guided imagery sessions'
        ],
        frequency: 'Twice daily',
        resources: ['Audio guides for relaxation', 'Stress management handout']
      },
      {
        category: 'Social Support',
        activities: [
          'Identify key support persons',
          'Schedule regular check-ins with family',
          'Join online IVF support community'
        ],
        frequency: 'Weekly',
        resources: ['Support network worksheet', 'Community resources list']
      }
    ],
    goals: [
      'Reduce anxiety from high to moderate level',
      'Develop 3 effective coping strategies',
      'Improve family communication about IVF journey'
    ],
    followUpDate: '2023-12-26'
  }
];

// Analytics data
const sampleAnalytics = {
  successRate: {
    overall: 68,
    byAge: [
      { group: '25-30', rate: 72 },
      { group: '31-35', rate: 68 },
      { group: '36-40', rate: 54 },
      { group: '40+', rate: 35 }
    ],
    byStage: [
      { stage: 'Initial Consultation', count: 15 },
      { stage: 'Ovarian Stimulation', count: 23 },
      { stage: 'Egg Retrieval', count: 18 },
      { stage: 'Embryo Transfer', count: 35 },
      { stage: 'Waiting Period', count: 24 },
      { stage: 'Result Follow-up', count: 9 }
    ],
    monthly: [
      { month: 'Jul', rate: 65 },
      { month: 'Aug', rate: 67 },
      { month: 'Sep', rate: 63 },
      { month: 'Oct', rate: 68 },
      { month: 'Nov', rate: 70 },
      { month: 'Dec', rate: 72 }
    ]
  },
  patientWellness: {
    average: 7.2,
    distribution: [
      { score: '1-3', count: 5 },
      { score: '4-6', count: 28 },
      { score: '7-8', count: 56 },
      { score: '9-10', count: 11 }
    ],
    trend: [
      { month: 'Jul', score: 6.8 },
      { month: 'Aug', score: 6.9 },
      { month: 'Sep', score: 7.0 },
      { month: 'Oct', score: 7.1 },
      { month: 'Nov', score: 7.2 },
      { month: 'Dec', score: 7.3 }
    ]
  },
  interventionEffectiveness: {
    byType: [
      { type: 'CBT', effectiveness: 82 },
      { type: 'Mindfulness', effectiveness: 78 },
      { type: 'Support Groups', effectiveness: 74 },
      { type: 'Couples Therapy', effectiveness: 71 },
      { type: 'Physical Activity', effectiveness: 68 }
    ],
    adherenceRate: 76
  }
};

// Settings data
const defaultSettings = {
  clinic: {
    name: 'Delhi IVF Center',
    address: '123 Healthcare Avenue, Delhi NCR',
    phone: '+91 11 2345 6789',
    email: 'info@delhiivf.com',
    logo: null
  },
  notifications: {
    emailReminders: true,
    smsReminders: true,
    appointmentAlerts: true,
    resultNotifications: true
  },
  security: {
    twoFactorAuth: false,
    dataRetentionPeriod: '5 years',
    encryptedStorage: true
  },
  display: {
    theme: 'light',
    language: 'english',
    dateFormat: 'DD/MM/YYYY',
    currencyFormat: '₹'
  },
  integration: {
    ehr: {
      enabled: false,
      provider: ''
    },
    calendar: {
      enabled: true,
      provider: 'Google Calendar'
    }
  }
};

export const AppProvider = ({ children }) => {
  // State management for patients
  const [patients, setPatients] = useState(samplePatients);
  const [assessments, setAssessments] = useState(sampleAssessments);
  const [plans, setPlans] = useState(samplePlans);
  const [analytics, setAnalytics] = useState(sampleAnalytics);
  const [settings, setSettings] = useState(defaultSettings);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New assessment completed for Priya Sharma', time: '2 hours ago', read: false },
    { id: 2, message: 'Intervention plan updated for Anita Patel', time: '4 hours ago', read: false },
    { id: 3, message: 'New patient registered: Meera Reddy', time: '1 day ago', read: true }
  ]);

  // Patient operations
  const addPatient = (patient) => {
    const newPatient = {
      ...patient,
      id: patients.length + 1,
      assessments: [],
      plans: [],
      progress: [],
      riskLevel: calculateRiskLevel(patient),
      lastSession: 'Just now',
      nextAppointment: 'Not scheduled'
    };
    setPatients([...patients, newPatient]);
    addNotification(`New patient registered: ${patient.name}`);
    return newPatient;
  };

  const updatePatient = (id, updatedData) => {
    setPatients(patients.map(patient => 
      patient.id === id ? { ...patient, ...updatedData } : patient
    ));
  };

  const deletePatient = (id) => {
    setPatients(patients.filter(patient => patient.id !== id));
    setAssessments(assessments.filter(assessment => assessment.patientId !== id));
    setPlans(plans.filter(plan => plan.patientId !== id));
  };

  const getPatientById = (id) => {
    return patients.find(patient => patient.id === Number(id)) || null;
  };

  // Assessment operations
  const addAssessment = (patientId, assessmentData) => {
    const newAssessment = {
      id: assessments.length + 1,
      patientId,
      date: new Date().toISOString().split('T')[0],
      score: calculateAssessmentScore(assessmentData),
      data: assessmentData
    };
    
    setAssessments([...assessments, newAssessment]);
    
    // Update patient with assessment reference
    updatePatient(patientId, {
      assessments: [...(getPatientById(patientId)?.assessments || []), { 
        id: newAssessment.id, 
        date: newAssessment.date, 
        score: newAssessment.score 
      }],
      lastSession: 'Just now'
    });
    
    addNotification(`Assessment completed for ${assessmentData.name}`);
    return newAssessment;
  };

  // Intervention plan operations
  const addInterventionPlan = (patientId, planData) => {
    const newPlan = {
      id: plans.length + 1,
      patientId,
      date: new Date().toISOString().split('T')[0],
      ...planData
    };
    
    setPlans([...plans, newPlan]);
    
    // Update patient with plan reference
    updatePatient(patientId, {
      plans: [...(getPatientById(patientId)?.plans || []), { 
        id: newPlan.id, 
        date: newPlan.date, 
        title: newPlan.title 
      }]
    });
    
    addNotification(`Intervention plan created for ${getPatientById(patientId)?.name}`);
    return newPlan;
  };

  // Progress tracking
  const addProgressEntry = (patientId, wellnessScore) => {
    const entry = {
      date: new Date().toISOString().split('T')[0],
      wellnessScore
    };
    
    const patient = getPatientById(patientId);
    if (patient) {
      const updatedProgress = [...(patient.progress || []), entry];
      updatePatient(patientId, { progress: updatedProgress });
      
      // Update analytics
      updateAnalytics();
    }
  };

  // Notification system
  const addNotification = (message) => {
    const newNotification = {
      id: notifications.length + 1,
      message,
      time: 'Just now',
      read: false
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Analytics operations
  const updateAnalytics = () => {
    // In a real app, this would calculate real analytics from the patient data
    // For now, we're just using the sample data
    console.log('Analytics updated');
  };

  // Settings operations
  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  // Utility functions
  const calculateRiskLevel = (patient) => {
    // Simplified risk calculation logic
    const age = parseInt(patient.age);
    const previousAttempts = parseInt(patient.previousAttempts || 0);
    
    if (age > 35 && previousAttempts >= 2) return 'high';
    if (age > 32 || previousAttempts >= 1) return 'medium';
    return 'low';
  };

  const calculateAssessmentScore = (data) => {
    // Simplified score calculation
    let score = 50; // Base score
    
    // Age factor (younger is better for IVF)
    const age = parseInt(data.age);
    if (age < 30) score += 15;
    else if (age < 35) score += 10;
    else if (age < 40) score += 5;
    
    // Anxiety level
    if (data.anxietyLevel === 'low') score += 15;
    else if (data.anxietyLevel === 'moderate') score += 7;
    
    // Stress factors (more factors = lower score)
    if (data.stressFactors) {
      score -= data.stressFactors.length * 2;
    }
    
    // Financial concerns
    if (data.budgetConcerns === 'no-concern') score += 10;
    else if (data.budgetConcerns === 'moderate') score += 5;
    
    // Insurance
    if (data.insuranceCoverage === 'Full coverage') score += 10;
    else if (data.insuranceCoverage === 'Partial coverage') score += 5;
    
    return Math.min(100, Math.max(0, score)); // Ensure score is between 0-100
  };

  // Value object to be provided to consumers
  const value = {
    // Patient data and operations
    patients,
    addPatient,
    updatePatient,
    deletePatient,
    getPatientById,
    currentPatient,
    setCurrentPatient,
    
    // Assessment operations
    assessments,
    addAssessment,
    
    // Intervention plans
    plans,
    addInterventionPlan,
    
    // Progress tracking
    addProgressEntry,
    
    // Analytics
    analytics,
    updateAnalytics,
    
    // Settings
    settings,
    updateSettings,
    
    // Notifications
    notifications,
    addNotification,
    markNotificationAsRead,
    
    // Loading state
    isLoading,
    setIsLoading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};