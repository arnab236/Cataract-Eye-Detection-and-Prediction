import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingView } from './views/LandingView';
import { IntakeView } from './views/IntakeView';
import { ResultsView } from './views/ResultsView';
import { PatientData, AnalysisResult, ViewState } from './types';
import { analyzeImage } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setCurrentView('intake');
  };

  const handleIntakeSubmit = async (data: PatientData) => {
    setPatientData(data);
    setLoading(true);
    
    if (data.image) {
      const result = await analyzeImage(data.image);
      setAnalysisResult(result);
      setLoading(false);
      setCurrentView('results');
    }
  };

  const handleReset = () => {
    setPatientData(null);
    setAnalysisResult(null);
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-cyan-500/30">
      <Header />
      
      {currentView === 'landing' && (
        <LandingView onStart={handleStart} />
      )}

      {currentView === 'intake' && (
        <IntakeView 
          onBack={() => setCurrentView('landing')} 
          onSubmit={handleIntakeSubmit} 
          loading={loading}
        />
      )}

      {currentView === 'results' && patientData && analysisResult && (
        <ResultsView 
          patient={patientData}
          result={analysisResult}
          onReset={handleReset}
          onBack={() => setCurrentView('intake')}
        />
      )}
    </div>
  );
};

export default App;
