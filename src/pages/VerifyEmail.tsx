
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from "sonner";
import Logo from '../components/Logo';

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'email@gmail.com';
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleVerify = () => {
    setIsLoading(true);
    
    // For demo purposes
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Email verified successfully!");
      navigate('/dashboard');
    }, 1500);
  };

  const handleResend = () => {
    // For demo purposes
    toast.success("Verification code resent!");
    setResendTimer(60); // Set a 60-second countdown
  };

  return (
    <div className="min-h-screen auth-gradient">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="mb-6">
          <Logo />
        </div>
        
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">
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
              onChange={(value) => setValue(value)}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, i) => (
                    <InputOTPSlot 
                      key={i} 
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
              className="w-full bg-purple-500 hover:bg-purple-600 h-12 rounded-lg"
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
            
            <div className="text-center">
              <button 
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0}
                className={`text-purple-600 hover:underline ${resendTimer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {resendTimer > 0 
                  ? `Resend code in ${resendTimer}s` 
                  : "Didn't receive an email? Resend email"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
