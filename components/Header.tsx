
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = false }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 flex items-center px-4 backdrop-blur-xl sticky top-0 z-50 bg-white/20">
      <div className="flex items-center w-full">
        {showBack ? (
          <button 
            onClick={() => navigate(-1)}
            className="p-2 mr-2 rounded-full hover:bg-white/50 active:scale-90 transition-all text-slate-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <div className="flex items-center">
            <Logo showText={false} size="sm" />
            <h1 className="text-xl font-bold text-slate-900 ml-3 tracking-tight">{title}</h1>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
