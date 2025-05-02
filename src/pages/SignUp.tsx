
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Lock, Facebook, Instagram, Linkedin } from 'lucide-react';
import Logo from '../components/Logo';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, we'll just navigate to the verify page
    setTimeout(() => {
      setIsLoading(false);
      navigate('/verify', { state: { email } });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <Logo />
          </div>
          
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            Sign Up
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="workwise-input pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <User size={18} />
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="workwise-input pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Mail size={18} />
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="workwise-input pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Lock size={18} />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="workwise-btn-primary w-full mt-6"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/sign-in" className="font-medium text-purple-600 hover:underline">
                  Sign in
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      
      <div className="hidden lg:block lg:w-1/2 auth-gradient">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Hello, Welcome to WorkWise!
          </h2>
          <p className="mb-8 text-xl text-gray-800">
            Manage tasks, time, teamwork more efficient and easy
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-black hover:text-purple-600">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-black hover:text-purple-600">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-black hover:text-purple-600">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
