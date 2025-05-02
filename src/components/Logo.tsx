
import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  if (variant === 'icon') {
    return (
      <div className={`text-purple-600 font-bold text-2xl ${className}`}>
        <img src="/workwise-icon.png" alt="WorkWise Icon" className="h-8" />
      </div>
    );
  }
  
  return (
    <div className={`text-purple-600 font-bold text-2xl flex items-center ${className}`}>
      <img src="/workwise-logo.png" alt="WorkWise" className="h-10" />
    </div>
  );
};

export default Logo;
