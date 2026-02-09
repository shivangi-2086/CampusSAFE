
import React, { useMemo } from 'react';
import Header from '../components/Header';
import { getRandomMessage } from '../constants/aiMessages';

const MOCK_HISTORY = [
  { id: 1, location: 'Hostel Road South', type: 'Unsafe Area', time: 'Yesterday, 10:15 PM', severity: 'medium' },
  { id: 2, location: 'Science Block C', type: 'Theft', time: '2 days ago, 3:30 PM', severity: 'high' },
  { id: 3, location: 'Main Gate Parking', type: 'Suspicious Activity', time: '3 days ago, 11:50 PM', severity: 'low' },
  { id: 4, location: 'Auditorium Corridor', type: 'Harassment', time: 'Last Week, 6:00 PM', severity: 'high' },
];

const HistoryScreen: React.FC = () => {
  const aiWarning = useMemo(() => getRandomMessage('history'), []);

  return (
    <div className="flex-1 flex flex-col animate-screen-entry">
      <Header title="Safety Map" showBack />
      
      <div className="p-5 flex-1 overflow-y-auto scrollbar-hide">
        {/* AI Insight Layer */}
        <div className="bg-amber-100 border border-amber-200 p-5 rounded-[2rem] mb-6 flex items-start space-x-3 shadow-sm">
          <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 animate-pulse"></div>
          <p className="text-sm font-bold text-amber-900 leading-tight">
            AI Insight: <span className="font-medium italic text-amber-700">"{aiWarning}"</span>
          </p>
        </div>

        <div className="mb-6 px-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Recent Incidents</h2>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-wide">Community-sourced data</p>
        </div>

        <div className="space-y-3">
          {MOCK_HISTORY.map((item, idx) => (
            <div 
              key={item.id} 
              className="bg-white/70 backdrop-blur-md p-5 rounded-[2rem] shadow-sm border border-white flex items-start space-x-4 transition-all active:scale-[0.98] animate-screen-entry"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                item.severity === 'high' ? 'bg-red-50 text-red-500' : 
                item.severity === 'medium' ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-400'
              }`}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 leading-tight tracking-tight">{item.location}</h3>
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                    item.severity === 'high' ? 'bg-red-500 text-white' : 
                    item.severity === 'medium' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mt-1 font-medium">{item.type}</p>
                <p className="text-slate-400 text-[10px] mt-2 font-black uppercase tracking-widest">{item.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl transition-transform hover:scale-[1.01]">
          <h4 className="font-black text-xl mb-3 tracking-tighter">Safe Route Advice</h4>
          <p className="text-indigo-100 text-sm font-medium leading-relaxed">
            Campus analysis recommends sticking to the illuminated East Perimeter during late hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
