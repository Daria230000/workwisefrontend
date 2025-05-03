
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { toast } from "sonner";
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
      toast.success("Reset instructions sent to your email");
    }, 1500);
  };

  return (
    <div className="min-h-screen auth-gradient flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Forgot Password?
          </h1>
          
          <p className="text-xl text-gray-800">
            Enter your e-mail address, and we'll give you reset instruction
          </p>
        </div>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter E-mail Address"
              className="w-full h-14 rounded-xl bg-gray-100 bg-opacity-50 px-4"
              required
            />

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 rounded-xl bg-purple-600 text-white font-medium"
            >
              {isLoading ? 'Sending...' : 'Send New Password'}
            </Button>

            <div className="text-center">
              <Link to="/sign-in" className="text-purple-600 hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-6 text-gray-800 text-lg">
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
  );
};

export default ForgotPassword;
