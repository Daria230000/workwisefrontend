
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '../components/Logo';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen auth-gradient flex flex-col items-center justify-center p-6">
      <div className="mb-12 flex flex-col items-center max-w-2xl text-center">
        <Logo className="mb-8" />
        <h1 className="text-5xl sm:text-6xl font-bold text-center text-gray-900 mb-6">
          Welcome to WorkWise
        </h1>
        <p className="text-2xl text-center text-gray-700 max-w-xl">
          Manage tasks, time, and teamwork more efficiently and easily
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xs sm:max-w-md">
        <Link to="/sign-in" className="w-full">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 text-lg">
            Sign In
          </Button>
        </Link>
        <Link to="/sign-up" className="w-full">
          <Button className="w-full bg-white hover:bg-gray-100 text-purple-600 border border-purple-600 font-medium py-3 text-lg">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
