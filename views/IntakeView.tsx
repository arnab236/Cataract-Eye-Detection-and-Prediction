import React, { useState, useRef } from 'react';
import { PatientData } from '../types';

interface Props {
  onBack: () => void;
  onSubmit: (data: PatientData) => void;
  loading: boolean;
}

export const IntakeView: React.FC<Props> = ({ onBack, onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (name && email && image) {
      onSubmit({ name, email, image, imagePreview: preview });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 px-4 md:px-0 pb-12">
      {/* Header Bar */}
      <div className="w-full max-w-5xl flex items-center mb-8 relative">
        <button 
          onClick={onBack}
          className="absolute left-0 text-cyan-400 hover:text-cyan-300 flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="w-full text-center text-white text-2xl font-bold">Patient Intake</h1>
      </div>

      <div className="w-full max-w-5xl text-center mb-8">
        <p className="text-slate-400">Please enter patient details and upload a clear fundus image for cataract analysis.</p>
      </div>

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl h-fit">
          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm font-bold mb-2">Patient Full Name</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-bold mb-2">Email Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@example.com"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="w-full lg:w-1/2">
            {/* Dashed Border Container */}
            <div 
              className={`relative bg-slate-800 rounded-xl border-2 border-dashed ${preview ? 'border-cyan-500' : 'border-slate-600'} h-80 flex flex-col items-center justify-center transition-all hover:border-cyan-400 cursor-pointer overflow-hidden group`}
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <div className="relative w-full h-full">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                     <span className="bg-slate-900/80 text-white px-4 py-2 rounded-full text-sm font-bold">Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center p-8 text-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4 text-cyan-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">Tap to upload Fundus Image</h3>
                  <p className="text-slate-500 text-sm mb-6">Supported formats: JPG, PNG (Max 5MB)</p>
                  <button className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-6 py-2 rounded-full font-bold text-sm transition-colors shadow-lg shadow-cyan-500/20">
                    Browse Files
                  </button>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden" 
              />
            </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="w-full max-w-5xl mt-8">
        <button 
          onClick={handleSubmit}
          disabled={!name || !email || !image || loading}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]
            ${(!name || !email || !image || loading) 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-cyan-400 hover:bg-cyan-300 text-slate-900 transform hover:scale-[1.01]'}`}
        >
          {loading ? (
             <>
               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
               Analyzing Image...
             </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Process Image
            </>
          )}
        </button>
        <p className="text-center text-slate-500 text-xs mt-4">By processing, you agree to the medical data privacy policy.</p>
      </div>
    </div>
  );
};
