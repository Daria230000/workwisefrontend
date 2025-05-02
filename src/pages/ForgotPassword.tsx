
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

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

  return (
    <div className="min-h-screen auth-gradient">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="mb-6">
          <Logo />
        </div>
        
        <div className="w-full max-w-md bg-white bg-opacity-10 p-8 rounded-3xl backdrop-blur-sm shadow-sm">
          <h2 className="mb-2 text-3xl font-bold text-center text-gray-900">
            Forgot Password?
          </h2>
          
          {!isSubmitted ? (
            <>
              <p className="mb-6 text-center text-gray-600">
                Enter your e-mail adress, and we'll give you reset instruction
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter E-mail Address"
                  className="w-full h-14 rounded-xl border border-gray-200 bg-gray-100 bg-opacity-50 px-4"
                  required
                />

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="workwise-btn-primary w-full bg-purple-600"
                >
                  {isLoading ? 'Sending...' : 'Send New Password'}
                </Button>

                <Link to="/sign-in" className="block text-center w-full">
                  <span className="text-purple-600 hover:underline">
                    Back to Login
                  </span>
                </Link>
              </form>
            </>
          ) : (
            <div className="text-center">
              <p className="mb-6 text-gray-600">
                We've sent a password reset link to <span className="font-medium text-purple-600">{email}</span>
              </p>
              
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsSubmitted(false)}
                  className="workwise-btn-secondary w-full"
                >
                  Resend reset link
                </Button>
                
                <Link to="/sign-in" className="block w-full">
                  <Button variant="outline" className="w-full border-gray-200 text-gray-600 hover:bg-gray-50">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to sign in
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
