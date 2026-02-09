
import React from 'react';
import Header from '../components/Header';
import { useSafety } from '../contexts/SafetyContext';

const AdminDashboard: React.FC = () => {
  const { reports, resolveReport } = useSafety();

  const pendingReports = reports.filter(r => r.status === 'Pending');
  const resolvedReports = reports.filter(r => r.status !== 'Pending');

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-screen-entry">
      <Header title="Admin Console" showBack />
      
      <div className="p-5 flex-1 overflow-y-auto scrollbar-hide space-y-6">
        
        {/* Statistics Shelf */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Cases</p>
             <p className="text-3xl font-black text-indigo-600">{pendingReports.length}</p>
          </div>
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Resolved Today</p>
             <p className="text-3xl font-black text-slate-800">{resolvedReports.length}</p>
          </div>
        </div>

        <h2 className="text-xl font-black text-slate-900 tracking-tight px-1">Action Required</h2>

        {pendingReports.length === 0 ? (
          <div className="bg-white p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center opacity-50 border-2 border-dashed border-slate-200">
             <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <p className="font-bold text-slate-500">All reports cleared</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingReports.map((report) => (
              <div key={report.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block ${
                      report.type === 'Personal' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      {report.type} • {report.category}
                    </span>
                    <h3 className="font-black text-slate-900 leading-tight tracking-tight">{report.location}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">From: {report.userEmail}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl italic">
                  "{report.description}"
                </p>

                <div className="flex space-x-3 pt-2">
                  <button 
                    onClick={() => resolveReport(report.id, true)}
                    className="flex-1 bg-emerald-500 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                  >
                    Verify (True)
                  </button>
                  <button 
                    onClick={() => resolveReport(report.id, false)}
                    className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                  >
                    Reject (Fake)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {resolvedReports.length > 0 && (
           <div className="space-y-4 pt-4">
              <h2 className="text-xl font-black text-slate-900 tracking-tight px-1">Audit History</h2>
              {resolvedReports.map(report => (
                <div key={report.id} className="bg-white/50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{report.location}</p>
                      <p className="text-xs font-bold text-slate-800">{report.category}</p>
                   </div>
                   <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                     report.status === 'Verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                   }`}>
                     {report.status}
                   </span>
                </div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
