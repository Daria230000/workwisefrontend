
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Logo from '../components/Logo';

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'email@gmail.com';
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    setIsLoading(true);
    
    // For demo purposes
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleResend = () => {
    // For demo purposes
    alert('Verification code resent!');
  };

  return (
    <div className="min-h-screen auth-gradient">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="mb-6">
          <Logo />
        </div>
        
        <div className="w-full max-w-md">
          <h2 className="mb-2 text-3xl font-bold text-center text-gray-900">
            We've emailed you a code
          </h2>
          
          <p className="mb-2 text-center text-gray-700">
            To complete your account sign up, enter the code that was sent to:
          </p>
          
          <p className="mb-8 text-center text-xl font-medium">
            {email}
          </p>
          
          <div className="flex justify-center mb-6">
            <InputOTP 
              maxLength={5}
              value={value}
              onChange={setValue}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot 
                      key={index} 
                      {...slot} 
                      className="w-16 h-16 text-2xl border-purple-300 rounded-lg"
                    />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={handleVerify}
              disabled={value.length !== 5 || isLoading}
              className="workwise-btn-primary w-full bg-purple-600"
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
            
            <div className="text-center">
              <button 
                type="button"
                onClick={handleResend}
                className="text-purple-600 hover:underline"
              >
                Didn't receive an email? Resend email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
