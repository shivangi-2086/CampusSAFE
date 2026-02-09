
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  vertical?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true, size = 'md', vertical = false }) => {
  const dimensions = {
    sm: { box: 'w-8 h-8', icon: 'w-5 h-5', font: 'text-lg' },
    md: { box: 'w-14 h-14', icon: 'w-8 h-8', font: 'text-2xl' },
    lg: { box: 'w-20 h-20', icon: 'w-12 h-12', font: 'text-4xl' }
  }[size];

  return (
    <div className={`flex ${vertical ? 'flex-col items-center space-y-4' : 'items-center space-x-3'} ${className}`}>
      <div className={`${dimensions.box} bg-indigo-600 rounded-[1.25rem] flex items-center justify-center shadow-xl shadow-indigo-200/50 ring-4 ring-white`}>
        <svg 
          className={`${dimensions.icon} text-white`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5} 
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
          />
        </svg>
      </div>
      {showText && (
        <h1 className={`${dimensions.font} font-black tracking-tight text-slate-900 leading-none`}>
          Campus<span className="text-indigo-600">Safe</span>
        </h1>
      )}
    </div>
  );
};

export default Logo;
