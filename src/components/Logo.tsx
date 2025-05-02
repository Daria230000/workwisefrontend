
import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  if (variant === 'icon') {
    return (
      <div className={`text-purple-600 font-bold text-2xl ${className}`}>
        WW
      </div>
    );
  }
  
  return (
    <div className={`text-purple-600 font-bold text-2xl flex items-center ${className}`}>
      <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.6 11.2L19.2 30.4L12.8 11.2H7.2L16 36.8H22.4L31.2 11.2H25.6Z" fill="#7C69F3"/>
        <path d="M52.8 11.2L46.4 30.4L40 11.2H34.4L43.2 36.8H49.6L58.4 11.2H52.8Z" fill="#7C69F3"/>
        <path d="M60.8 11.2V16.8H67.2V36.8H72.8V16.8H79.2V11.2H60.8Z" fill="#7C69F3"/>
      </svg>
      <span>WorkWise</span>
    </div>
  );
};

export default Logo;
