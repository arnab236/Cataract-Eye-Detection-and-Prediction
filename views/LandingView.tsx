import React from 'react';

interface Props {
  onStart: () => void;
}

export const LandingView: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-12 gap-12">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Cataract Detection & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Severity Analysis System
            </span>
          </h1>
          <h2 className="text-cyan-400 text-lg md:text-xl font-semibold">
            AI-powered screening from fundus images for detailed insights
          </h2>

          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-white text-xl font-bold mb-4">Understanding Cataract AI</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Early and accurate detection is crucial for preserving vision. Our cutting-edge AI system is designed to provide comprehensive analysis of fundus images, identifying cataract presence and severity with unprecedented speed and precision.
            </p>
            <ul className="space-y-3">
              {[
                { title: "Rapid Analysis", desc: "Get instant results on cataract severity." },
                { title: "High Accuracy", desc: "Leveraging advanced machine learning for diagnostics." },
                { title: "Objective Assessment", desc: "Minimize human variability with AI-driven evaluation." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-cyan-400 text-lg leading-none">•</span>
                  <span><strong className="text-white">{item.title}:</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Visual */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="relative bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-2xl overflow-hidden group">
             {/* Decorative eye graphic placeholder */}
            <div className="aspect-square w-full rounded-xl bg-slate-900 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
              {/* Animated Rings */}
              <div className="absolute w-[80%] h-[80%] border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute w-[60%] h-[60%] border border-cyan-500/40 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 bg-slate-950 rounded-full border-2 border-cyan-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                <svg className="w-16 h-16 md:w-24 md:h-24 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {/* Scan line */}
                <div className="absolute w-full h-1 bg-cyan-400/50 top-0 animate-[scan_3s_ease-in-out_infinite] shadow-[0_0_15px_#22d3ee]"></div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-around text-center">
              <div>
                <div className="text-green-400 text-xl font-bold">HIPAA</div>
                <div className="text-slate-500 text-xs">Compliant</div>
              </div>
              <div>
                <div className="text-blue-400 text-xl font-bold">Clinically</div>
                <div className="text-slate-500 text-xs">Validated</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-xl">Ready for an Instant Analysis?</h3>
              <p className="text-slate-400 text-sm mt-2 max-w-md">
                Upload your fundus image securely to receive an immediate, AI-driven assessment.
              </p>
            </div>
            <button 
              onClick={onStart}
              className="w-full md:w-auto px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Check Your Eye Now
            </button>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-800 text-center text-slate-600 text-sm">
        <div className="flex justify-between max-w-7xl mx-auto px-6">
          <span>© 2023 Cataract AI. All rights reserved.</span>
          <div className="space-x-4">
             <a href="#" className="hover:text-cyan-500">Privacy Policy</a>
             <a href="#" className="hover:text-cyan-500">Terms of Service</a>
          </div>
        </div>
      </footer>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
