
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <AuthLayout title="Reset password">
        <div className="flex flex-col items-center justify-center space-y-6 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-workwise-lightBlue">
            <CheckCircle className="h-8 w-8 text-workwise-blue" />
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-medium text-workwise-text">
              Reset link sent
            </h3>
            <p className="mt-2 text-workwise-darkGray">
              We've sent a password reset link to <span className="font-medium text-workwise-blue">{email}</span>
            </p>
          </div>
          
          <div className="w-full space-y-4 pt-4">
            <Button 
              variant="outline"
              className="workwise-btn-secondary w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Resend reset link
            </Button>
            
            <Link to="/sign-in" className="block w-full">
              <Button 
                variant="outline" 
                className="w-full border-workwise-border text-workwise-darkGray hover:bg-gray-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to sign in
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Reset your password" 
      subtitle="Enter your email and we'll send you a link to reset your password"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <Button 
          type="submit" 
          disabled={isLoading}
          className="workwise-btn-primary w-full"
        >
          {isLoading ? 'Sending...' : 'Send reset link'}
        </Button>

        <Link to="/sign-in" className="block w-full">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full border-workwise-border text-workwise-darkGray hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Button>
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
