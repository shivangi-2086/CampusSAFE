
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getRandomMessage } from '../constants/aiMessages';
import { useSafety } from '../contexts/SafetyContext';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { status, trustScore, role, notifications } = useSafety();
  const aiMessage = useMemo(() => getRandomMessage('home'), []);

  const userEmail = localStorage.getItem('userEmail') || 'student@campus.edu';
  const displayName = useMemo(() => {
    const namePart = userEmail.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  }, [userEmail]);

  return (
    <div className="flex-1 flex flex-col animate-screen-entry pb-6 overflow-y-auto scrollbar-hide">
      {/* Sleek App Header */}
      <Header title="CampusSafe" />
      
      <div className="px-6 flex-1 flex flex-col">
        
        {/* Integrated Profile Section */}
        <div className="flex items-center justify-between py-4 mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 ring-2 ring-white">
              <span className="text-xl font-black">{displayName.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 leading-none mb-1">{displayName}</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{role} • Member</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center justify-end space-x-1.5 mb-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Safe</span>
            </div>
            <div className="inline-block bg-indigo-50 px-2 py-1 rounded-md">
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-tighter">Trust Score: {trustScore}</span>
            </div>
          </div>
        </div>

        {/* Notifications Area (Only if active) */}
        {notifications.length > 0 && (
          <div className="bg-red-500 text-white p-4 rounded-2xl shadow-lg shadow-red-100 mb-4 animate-pulse flex items-center space-x-3">
             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
             </div>
             <p className="text-xs font-bold leading-tight">{notifications[0].senderName} needs help at {notifications[0].message}</p>
          </div>
        )}

        {/* AI Insight banner */}
        <div className="mb-6 px-1">
          <p className="text-xs text-slate-500 font-medium italic border-l-2 border-indigo-200 pl-3 py-1">
            "{aiMessage}"
          </p>
        </div>

        {/* Admin Quick Entry */}
        {role === 'Admin' && (
           <button
            onClick={() => navigate('/admin')}
            className="mb-4 bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between active:scale-[0.98] transition-all shadow-md"
           >
              <div className="flex items-center space-x-3">
                 <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-[10px] font-bold">ADM</div>
                 <span className="font-black text-[9px] uppercase tracking-widest">Admin Control Console</span>
              </div>
              <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
           </button>
        )}

        {/* Emergency Hero Action */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/sos')}
            className="w-full bg-red-500 rounded-[2.5rem] py-8 flex flex-col items-center justify-center text-white shadow-2xl shadow-red-200 active:scale-[0.97] transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
            <div className="bg-white/20 p-4 rounded-full mb-2 backdrop-blur-sm relative z-10">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter relative z-10">Emergency SOS</span>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mt-1 relative z-10">Alert Security & Friends</p>
          </button>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => navigate('/walk')}
            className="p-5 rounded-3xl flex flex-col items-center justify-center text-white bg-indigo-600 shadow-xl shadow-indigo-100 active:scale-[0.95] transition-all group"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-black text-[9px] tracking-widest uppercase">Walk With Me</span>
          </button>

          <button
            onClick={() => navigate('/report')}
            className="bg-white p-5 rounded-3xl flex flex-col items-center justify-center shadow-lg shadow-slate-200/50 border border-slate-50 active:scale-[0.95] transition-all"
          >
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-2 text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-black text-[9px] text-slate-800 tracking-widest uppercase">Submit Report</span>
          </button>

          <button
            onClick={() => navigate('/history')}
            className="bg-white p-5 rounded-3xl flex flex-col items-center justify-center shadow-lg shadow-slate-200/50 border border-slate-50 active:scale-[0.95] transition-all"
          >
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-2 text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <span className="font-black text-[9px] text-slate-800 tracking-widest uppercase">Safe Map</span>
          </button>

          <button
            onClick={() => navigate('/contacts')}
            className="bg-white p-5 rounded-3xl flex flex-col items-center justify-center shadow-lg shadow-slate-200/50 border border-slate-50 active:scale-[0.95] transition-all"
          >
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-2 text-emerald-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-black text-[9px] text-slate-800 tracking-widest uppercase">Contacts</span>
          </button>
        </div>

        {/* Tagline footer */}
        <div className="mt-auto text-center py-2">
          <p className="font-elegant text-indigo-400 text-lg opacity-60">"Your safety, our commitment"</p>
        </div>
      </div>

      <div className="px-10 pb-2">
        <button 
          onClick={() => {
            localStorage.removeItem('userEmail');
            navigate('/login');
          }}
          className="w-full text-slate-300 font-bold text-[9px] py-4 border-t border-slate-100 uppercase tracking-widest active:opacity-60 transition-all"
        >
          Logout Safely
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
