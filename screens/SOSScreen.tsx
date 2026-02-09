
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import { getRandomMessage } from '../constants/aiMessages';
import { useSafety } from '../contexts/SafetyContext';

const SOSScreen: React.FC = () => {
  const { status, setStatus, addNotification } = useSafety();
  const [isTriggered, setIsTriggered] = useState(status === 'Emergency');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const preMessage = useMemo(() => getRandomMessage('sos_pre'), []);
  const postMessage = useMemo(() => getRandomMessage('sos_post'), []);

  const userEmail = localStorage.getItem('userEmail') || 'User';

  const handleSOS = () => {
    if (!isTriggered) {
      setIsTriggered(true);
      setStatus('Emergency');
      
      // Mock triggering notification for trusted friends
      addNotification({
        id: Math.random().toString(),
        senderName: userEmail.split('@')[0].toUpperCase(),
        message: "Emergency SOS triggered! GPS active.",
        time: new Date().toLocaleTimeString(),
        severity: 'high'
      });

      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 500]);
      }

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (p) => setLocation({ lat: p.coords.latitude, lng: p.coords.longitude }),
          (e) => console.error(e)
        );
      }
    }
  };

  return (
    <div className={`flex-1 flex flex-col transition-colors duration-700 animate-screen-entry ${isTriggered ? 'bg-red-600' : 'bg-slate-900'}`}>
      <Header title="Emergency Portal" showBack />
      
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        
        <div className="mb-10 w-full">
          <p className={`text-base font-bold italic tracking-wide mb-2 ${isTriggered ? 'text-white' : 'text-indigo-400'}`}>
            "{isTriggered ? postMessage : preMessage}"
          </p>
          <div className={`h-1 w-12 mx-auto rounded-full ${isTriggered ? 'bg-white/30' : 'bg-indigo-500/30'}`}></div>
        </div>

        {!isTriggered && (
          <div className="mb-12 animate-fadeIn">
            <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Tap to Alert</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">Broadcast to security and all trusted friends immediately.</p>
          </div>
        )}

        <div className="relative mb-12">
          {isTriggered && (
             <div className="absolute inset-0 bg-white/20 rounded-full animate-ping scale-150"></div>
          )}
          
          <button
            onClick={handleSOS}
            className={`relative z-10 w-64 h-64 rounded-full flex flex-col items-center justify-center transition-all active:scale-95 shadow-2xl ${
              isTriggered 
                ? 'bg-white shadow-red-900 animate-sos-pulse' 
                : 'bg-red-500 hover:bg-red-600 border-8 border-slate-800'
            }`}
          >
            <div className={`p-6 rounded-full mb-2 ${isTriggered ? 'bg-red-50' : 'bg-white/10'}`}>
                <svg className={`w-12 h-12 ${isTriggered ? 'text-red-500' : 'text-white'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
            </div>
            <span className={`text-4xl font-black tracking-tight ${isTriggered ? 'text-red-600' : 'text-white'}`}>
              {isTriggered ? 'ACTIVE' : 'SOS'}
            </span>
          </button>
        </div>

        {isTriggered && (
          <div className="w-full space-y-6 animate-screen-entry">
            <div className="p-8 bg-white/15 backdrop-blur-xl rounded-[2.5rem] border border-white/20">
              <h3 className="text-white font-black text-2xl mb-2 tracking-tight">Help Alerted</h3>
              <p className="text-red-100 text-[10px] font-black uppercase tracking-widest mb-6">Friends & Security Notified</p>
              
              {location && (
                  <div className="bg-black/20 p-5 rounded-3xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-center text-xs font-black uppercase text-white/50 tracking-widest">
                        <span>Live GPS</span>
                        <span className="text-emerald-400 flex items-center">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                            Online
                        </span>
                    </div>
                    <div className="h-[1px] bg-white/5"></div>
                    <p className="text-white font-mono text-sm">{location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p>
                  </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-10">
        <button 
          onClick={() => {
            setIsTriggered(false);
            setStatus('Safe');
          }}
          className="w-full py-4 text-white/40 font-bold uppercase tracking-widest text-[11px] hover:text-white/60 active:scale-95 transition-all"
        >
          {isTriggered ? 'End Emergency Session' : 'Cancel Alert'}
        </button>
      </div>
    </div>
  );
};

export default SOSScreen;
