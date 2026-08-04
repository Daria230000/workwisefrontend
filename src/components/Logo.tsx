
import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  if (variant === 'icon') {
    return (
      <div className={`text-purple-600 font-bold text-2xl ${className}`}>
        <img src="/images/logo.png" alt="WorkWise Icon" className="h-10" />
      </div>
    );
  }
  
  return (
    <div className={`text-purple-600 font-bold text-2xl flex items-center ${className}`}>
      <img src="/images/logo.png" alt="WorkWise" className="h-16" />
    </div>
  );
};

export default Logo;
