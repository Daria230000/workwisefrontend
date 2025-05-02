
import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  if (variant === 'icon') {
    return (
      <div className={`text-workwise-blue font-bold text-2xl ${className}`}>
        WW
      </div>
    );
  }
  
  return (
    <div className={`text-workwise-blue font-bold text-2xl ${className}`}>
      WorkWise
    </div>
  );
};

export default Logo;
