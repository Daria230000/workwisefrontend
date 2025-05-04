import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Lock, Facebook, Instagram } from 'lucide-react';
import { toast } from "sonner";
import Logo from '../components/Logo';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, we'll just navigate to the dashboard
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!");
      navigate('/dashboard');
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
            Sign in
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Mail size={18} />
              </div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="pl-10 h-12 rounded-lg"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Lock size={18} />
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="pl-10 h-12 rounded-lg"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember" className="h-4 w-4 border-gray-300" />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm font-medium text-purple-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-purple-500 hover:bg-purple-600 h-12 rounded-lg"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/sign-up" className="font-medium text-purple-600 hover:underline">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      
      <div className="hidden lg:block lg:w-1/2 bg-purple-100">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Hello, Welcome to WorkWise!
          </h2>
          <p className="mb-8 text-xl text-gray-800">
            Manage tasks, time, teamwork more efficiently and easily
          </p>
          <div className="flex space-x-4">
            <a href="#" className="rounded-full bg-black p-2 text-white hover:bg-purple-600">
              <Facebook size={24} />
            </a>
            <a href="#" className="rounded-full bg-black p-2 text-white hover:bg-purple-600">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
