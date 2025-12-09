import React from 'react';

export const Header: React.FC = () => {
  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-cyan-500/30">
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <span className="text-white font-bold text-xl tracking-tight">Cataract AI</span>
      </div>

      <div className="hidden md:flex gap-8 text-slate-400 text-sm font-medium">
        <a href="#" className="hover:text-cyan-400 transition-colors">Overview</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">How It Works</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">For Professionals</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
      </div>

      <button className="hidden md:block bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-5 py-2 rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        Login
      </button>

      {/* Mobile Menu Icon */}
      <button className="md:hidden text-white">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};
