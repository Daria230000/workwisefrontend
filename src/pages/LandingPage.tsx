
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '../components/Logo';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen auth-gradient flex flex-col items-center justify-center p-6 relative">
      <div className="mb-12 flex flex-col items-center max-w-3xl text-center">
        <Logo className="mb-12" />
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center text-gray-900 mb-6">
          Welcome to WorkWise
        </h1>
        <p className="text-xl md:text-2xl text-center text-gray-700 max-w-2xl">
          The smart workforce management platform that helps prevent burnout, monitor productivity, and improve team efficiency.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xs sm:max-w-md">
        <Link to="/sign-in" className="w-full">
          <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg text-lg">
            Sign In
          </Button>
        </Link>
        <Link to="/sign-up" className="w-full">
          <Button className="w-full bg-white hover:bg-gray-100 text-purple-600 border border-purple-600 font-medium py-3 rounded-lg text-lg">
            Sign Up
          </Button>
        </Link>
      </div>

      <footer className="absolute bottom-4 text-sm text-gray-500">
        © 2025 WorkWise. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
