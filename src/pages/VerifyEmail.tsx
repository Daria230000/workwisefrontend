
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'your email';

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <AuthLayout title="Verify your email">
      <div className="flex flex-col items-center justify-center space-y-6 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-workwise-lightBlue">
          <CheckCircle className="h-8 w-8 text-workwise-blue" />
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-medium text-workwise-text">
            Email verification sent
          </h3>
          <p className="mt-2 text-workwise-darkGray">
            We've sent a verification link to <span className="font-medium text-workwise-blue">{email}</span>
          </p>
        </div>
        
        <div className="w-full space-y-4 pt-4">
          <Button 
            onClick={handleContinue}
            className="workwise-btn-primary w-full"
          >
            Continue to dashboard
          </Button>
          
          <Button 
            variant="outline"
            className="workwise-btn-secondary w-full"
            onClick={() => window.location.reload()}
          >
            Resend verification email
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
