
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User, Building } from 'lucide-react';

const SignUp: React.FC = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <AuthLayout 
      title="Create your WorkWise account" 
      subtitle="Get started managing your organization's wellbeing"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="organization">Organization name</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-workwise-darkGray">
              <Building size={18} />
            </div>
            <Input
              id="organization"
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              placeholder="Acme Inc."
              className="workwise-input pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-workwise-darkGray">
              <User size={18} />
            </div>
            <Input
              id="name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Smith"
              className="workwise-input pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-workwise-darkGray">
              <Mail size={18} />
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="workwise-input pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-workwise-darkGray">
              <Lock size={18} />
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="workwise-input pl-10"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-workwise-darkGray"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-xs text-workwise-darkGray">
            Min. 8 characters with at least 1 number and 1 special character
          </p>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="workwise-btn-primary w-full mt-6"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>

        <div className="text-center">
          <span className="text-sm text-workwise-darkGray">
            Already have an account?{' '}
            <Link to="/sign-in" className="font-medium text-workwise-blue hover:underline">
              Sign in
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
