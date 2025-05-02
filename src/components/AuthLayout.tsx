
import React from 'react';
import Logo from './Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title,
  subtitle,
}) => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo className="mx-auto" />
          
          <h2 className="mt-8 text-center text-2xl font-bold text-workwise-text">
            {title}
          </h2>
          
          {subtitle && (
            <p className="mt-2 text-center text-sm text-workwise-darkGray">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {children}
        </div>
      </div>
      
      {/* Right side - Background image */}
      <div className="hidden lg:block lg:w-1/2 auth-container" />
    </div>
  );
};

export default AuthLayout;
