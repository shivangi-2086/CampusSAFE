
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useSafety } from '../contexts/SafetyContext';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setRole } = useSafety();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('userEmail', email);
      
      // Role Detection Logic
      if (email.includes('admin@')) {
        setRole('Admin');
      } else if (email.includes('staff@')) {
        setRole('Staff');
      } else {
        setRole('Student');
      }
      
      navigate('/home');
    }
  };

  return (
    <div className="flex-1 flex flex-col px-8 pt-16 pb-12 animate-screen-entry overflow-y-auto scrollbar-hide">
      <div className="mb-14 flex flex-col items-center justify-center text-center">
        <Logo size="lg" vertical className="mb-6" />
        <div className="space-y-1">
          <p className="text-slate-400 font-semibold text-xs uppercase tracking-[0.2em]">Secure Campus Portal</p>
          <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-2">Exclusively for Women Students & Staff</p>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-3xl border border-white/80 p-8 rounded-[3rem] shadow-2xl shadow-indigo-100/40 relative">
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-500/10 rounded-full blur-xl"></div>
        
        <form onSubmit={handleLogin} className="space-y-7">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-2">University Email</label>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" /></svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4.5 rounded-2xl border-2 border-slate-50/50 bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-semibold text-slate-800 shadow-sm placeholder:text-slate-300"
                placeholder="id@university.edu"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-2">Secure Pin</label>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4.5 rounded-2xl border-2 border-slate-50/50 bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-semibold text-slate-800 shadow-sm placeholder:text-slate-300"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all text-lg tracking-tight mt-4"
          >
            Sign In
          </button>
        </form>
      </div>

      <div className="mt-auto pt-10 text-center space-y-4">
        <p className="text-[10px] font-medium text-slate-400">Use <span className="text-indigo-500 font-bold">admin@campus.edu</span> for monitoring view</p>
        <button className="text-[11px] font-black text-indigo-400/80 uppercase tracking-widest">
          Request Access Credentials
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
