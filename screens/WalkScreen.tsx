
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import { useSafety } from '../contexts/SafetyContext';
import { useNavigate } from 'react-router-dom';

const WalkScreen: React.FC = () => {
  const { status, setStatus } = useSafety();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(status === 'Monitoring');
  const [destination, setDestination] = useState('');
  const [isEnteringDestination, setIsEnteringDestination] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [currentAiMsg, setCurrentAiMsg] = useState('');
  const [showHelpNotified, setShowHelpNotified] = useState(false);

  const messages = useMemo(() => {
    return [
      "I'm walking with you.",
      "You're not alone.",
      "Monitoring your route closely.",
      "Stay focused on your surroundings."
    ];
  }, []);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      setCurrentAiMsg(messages[Math.floor(Math.random() * messages.length)]);
      
      interval = setInterval(() => {
        setSeconds(s => s + 1);
        if ((seconds + 1) % 10 === 0) {
          setCurrentAiMsg(messages[Math.floor(Math.random() * messages.length)]);
        }
      }, 1000);
    } else {
      setSeconds(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, messages]);

  const handleStartWalk = () => {
    if (!destination.trim()) return;
    setIsActive(true);
    setIsEnteringDestination(false);
    setStatus('Monitoring');
  };

  const handleEndWalk = () => {
    setIsActive(false);
    setIsEnteringDestination(true);
    setDestination('');
    setStatus('Safe');
    setShowHelpNotified(false);
  };

  const handleCheckInNo = () => {
    setStatus('Emergency');
    setShowHelpNotified(true);
    // Vibrate if possible
    if ('vibrate' in navigator) {
      navigator.vibrate([500, 200, 500]);
    }
    // Navigate to SOS after a brief moment or show SOS overlay
    setTimeout(() => {
      navigate('/sos');
    }, 1500);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex-1 flex flex-col transition-all duration-700 animate-screen-entry ${isActive ? 'bg-[#4338ca] animate-soft-glow' : 'bg-transparent'}`}>
      <Header title="Walk With Me" showBack />
      
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center py-6">
        {!isActive ? (
          <div className="animate-screen-entry w-full space-y-6">
            <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-[2rem] flex items-center justify-center shadow-sm mx-auto border border-white">
              <svg className="w-10 h-10 text-[#4338ca]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-stone-900 tracking-tighter">Plan Your Route</h2>
              <p className="text-stone-500 font-medium leading-snug">Enter your destination so we can watch over your journey.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white text-left space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Final Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. North Dorms, Library"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-indigo-50 bg-white focus:border-indigo-500 outline-none font-bold text-slate-900 transition-all placeholder:text-slate-300"
                />
              </div>

              <button
                onClick={handleStartWalk}
                disabled={!destination.trim()}
                className="w-full bg-[#4338ca] text-white font-black py-5 rounded-[2rem] shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all text-xl tracking-tight"
              >
                Start Guarded Walk
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-screen-entry w-full flex flex-col items-center">
            {/* Active Destination Header */}
            <div className="w-full mb-8 bg-white/10 backdrop-blur-md py-3 px-6 rounded-2xl border border-white/20">
               <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest block mb-1">To Destination</span>
               <h3 className="text-white text-lg font-bold truncate">{destination}</h3>
            </div>

            {/* AI Layer */}
            <div className="mb-8 animate-fade-in h-6">
               <p className="text-indigo-100 text-sm font-bold italic tracking-wide">"{currentAiMsg}"</p>
            </div>

            <div className="relative mb-10">
              <div className="absolute inset-0 bg-white/10 rounded-full animate-ping scale-150"></div>
              <div className="relative w-44 h-44 bg-white rounded-full flex items-center justify-center border-8 border-indigo-200 shadow-2xl">
                <span className="text-5xl font-black text-[#4338ca] tracking-tighter">{formatTime(seconds)}</span>
              </div>
            </div>

            {/* Safety Check-in Card */}
            <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2.5rem] shadow-2xl space-y-4 mb-8">
              {showHelpNotified ? (
                <div className="py-4 animate-screen-entry">
                   <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                   </div>
                   <h4 className="text-white font-black text-xl tracking-tight">Help is being notified</h4>
                   <p className="text-red-100 text-sm font-medium mt-1">Dispatching security to your GPS location.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-white text-xl font-black tracking-tight">Are you okay?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => {}} // "Yes" keeps timer running
                      className="bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-2xl flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-black uppercase tracking-widest text-sm">Yes</span>
                    </button>
                    <button 
                      onClick={handleCheckInNo}
                      className="bg-red-500 hover:bg-red-600 text-white py-5 rounded-2xl flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="font-black uppercase tracking-widest text-sm">No</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            
            <button
              onClick={handleEndWalk}
              className="w-full bg-white text-[#4338ca] font-black py-5 rounded-[2.5rem] shadow-xl active:scale-95 transition-all text-xl tracking-tight"
            >
              End Session Safely
            </button>
          </div>
        )}
      </div>

      <div className={`p-8 text-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em]">Guardian Verified • Active Monitoring</p>
      </div>
    </div>
  );
};

export default WalkScreen;
