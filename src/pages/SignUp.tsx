
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Lock, Building, Facebook, Instagram, Linkedin } from 'lucide-react';
import { toast } from "sonner";
import Logo from '../components/Logo';

const SignUp: React.FC = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, we'll just navigate to the verify page
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created! Check your email for verification");
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
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Organization Name"
                className="workwise-input pl-10"
                required
              />
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Admin Name"
                className="workwise-input pl-10"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="workwise-input pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="workwise-input pl-10"
                required
              />
            </div>

            <div>
              <Select 
                value={role} 
                onValueChange={setRole}
              >
                <SelectTrigger className="workwise-input">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="hr">HR Manager</SelectItem>
                  <SelectItem value="manager">Team Manager</SelectItem>
                </SelectContent>
              </Select>
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
            Manage tasks, time, teamwork more efficiently and easily
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
