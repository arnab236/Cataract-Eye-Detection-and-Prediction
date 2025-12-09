import React, { useState } from 'react';
import { AnalysisResult, PatientData, CataractSeverity } from '../types';

interface Props {
  patient: PatientData;
  result: AnalysisResult;
  onReset: () => void;
  onBack: () => void;
}

export const ResultsView: React.FC<Props> = ({ patient, result, onReset, onBack }) => {
  const [activeTab, setActiveTab] = useState<'original' | 'heatmap'>('original');

  const severityColor = {
    [CataractSeverity.Healthy]: "text-green-500",
    [CataractSeverity.Mild]: "text-yellow-500",
    [CataractSeverity.Moderate]: "text-orange-500",
    [CataractSeverity.Severe]: "text-red-500",
  };
  
  const severityBg = {
     [CataractSeverity.Healthy]: "bg-green-500",
     [CataractSeverity.Mild]: "bg-yellow-500",
     [CataractSeverity.Moderate]: "bg-orange-500",
     [CataractSeverity.Severe]: "bg-red-500",
  };

  return (
    <div className="min-h-screen pt-4 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Navigation for Dashboard */}
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-slate-400 hover:text-white">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-white text-xl font-bold">Patient Dashboard</h1>
      </div>

      {/* Top Status Card */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8 shadow-lg relative overflow-hidden">
        {/* Glow effect based on severity */}
        <div className={`absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 ${result.hasCataract ? 'bg-orange-500' : 'bg-green-500'}`}></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Patient: {patient.name}</div>
            <div className="flex items-center gap-3">
               {result.hasCataract ? (
                 <>
                   <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                   <h2 className="text-2xl md:text-3xl font-bold text-orange-500">Cataract Detected</h2>
                 </>
               ) : (
                 <>
                   <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   <h2 className="text-2xl md:text-3xl font-bold text-green-500">Healthy Eye</h2>
                 </>
               )}
            </div>
          </div>
          <div className="text-right">
             <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${result.hasCataract ? 'bg-orange-900/50 text-orange-400 border border-orange-700' : 'bg-green-900/50 text-green-400 border border-green-700'}`}>
               {result.hasCataract ? 'ATTENTION NEEDED' : 'NORMAL SCAN'}
             </div>
             <div className="text-white text-3xl font-bold">{result.confidence}% <span className="text-slate-500 text-lg font-normal">Confidence</span></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Data */}
        <div className="w-full lg:w-1/2 space-y-6">
          
          {/* Analysis Overview */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md">
            <h3 className="text-white text-lg font-bold mb-6">AI Analysis Overview</h3>
            
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Severity Level</span>
                <span className={`font-bold ${severityColor[result.severity]}`}>{result.severity}</span>
              </div>
              <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden flex">
                <div className={`h-full bg-green-500 opacity-30 w-1/3`}></div>
                <div className={`h-full bg-yellow-500 opacity-30 w-1/3`}></div>
                <div className={`h-full bg-red-500 opacity-30 w-1/3`}></div>
                
                {/* Overlay actual value bar */}
                <div className="absolute h-3 rounded-full flex w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] pointer-events-none max-w-[500px]"> 
                   {/* This is a visual trick, in real app we calculate width based on score */}
                   <div 
                     className={`h-full ${severityBg[result.severity]} transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor]`} 
                     style={{ 
                       width: result.severity === 'Healthy' ? '33%' : result.severity === 'Mild' ? '50%' : result.severity === 'Moderate' ? '75%' : '100%',
                       opacity: 1
                     }}
                   ></div>
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-slate-400 text-xs mb-1">Opacity Score</div>
                <div className="text-white font-bold text-xl">{result.opacityScore}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-slate-400 text-xs mb-1">Type</div>
                <div className="text-white font-bold text-xl">{result.type}</div>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-[#1f1a18] rounded-xl border border-orange-900/50 p-6 shadow-md">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-900/30 rounded-lg text-orange-500 mt-1">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <div>
                <h3 className="text-orange-500 font-bold text-lg mb-2">Recommendation</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {result.recommendation}
                </p>
                <div className="mt-4 pt-4 border-t border-orange-900/30 text-xs text-slate-500">
                  <span className="font-bold text-slate-400">Reasoning:</span> {result.reasoning}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Visuals */}
        <div className="w-full lg:w-1/2">
           <h3 className="text-white text-lg font-bold mb-4">Visual Analysis</h3>
           
           {/* Tabs */}
           <div className="bg-slate-800 p-1 rounded-lg inline-flex mb-4 w-full">
             <button 
               className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'original' ? 'bg-cyan-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
               onClick={() => setActiveTab('original')}
             >
               Original Fundus
             </button>
             <button 
               className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'heatmap' ? 'bg-cyan-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
               onClick={() => setActiveTab('heatmap')}
             >
               AI Heatmap
             </button>
           </div>

           {/* Image Viewer */}
           <div className="relative aspect-[4/3] bg-black rounded-xl overflow-hidden border border-slate-700 group">
              {patient.imagePreview && (
                <>
                  <img 
                    src={patient.imagePreview} 
                    alt="Scan Analysis" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Simulated Heatmap Overlay */}
                  {activeTab === 'heatmap' && (
                    <div className="absolute inset-0 mix-blend-overlay opacity-80 animate-fade-in">
                       <div className="w-full h-full bg-gradient-to-tr from-blue-900/50 via-transparent to-red-600/60"></div>
                       {/* Simulate hotspots */}
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-500/40 blur-2xl rounded-full"></div>
                       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded border border-white/10">
                    {activeTab === 'original' ? 'Raw Input' : 'Attention Map'}
                  </div>

                  <button className="absolute bottom-4 left-4 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10 transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                    Expand
                  </button>
                </>
              )}
           </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 border-t border-slate-800 pt-8">
        <button className="flex-1 py-3 px-6 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 font-bold flex items-center justify-center gap-2 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download Report (PDF)
        </button>
        <button 
          onClick={onReset}
          className="flex-1 py-3 px-6 bg-cyan-400 text-slate-900 rounded-lg hover:bg-cyan-300 font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Mark Reviewed & Scan Next Patient
        </button>
      </div>
    </div>
  );
};
