import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { AuthStep } from '../types';
import { sendTelegramCode, verifyTelegramCode } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [step, setStep] = useState<AuthStep>(AuthStep.PHONE_INPUT);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setStep(AuthStep.PHONE_INPUT);
      setPhoneNumber('');
      setUsername('');
      setOtp('');
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await sendTelegramCode(phoneNumber, username);
      setStep(AuthStep.OTP_VERIFICATION);
    } catch (err: any) {
      setError(err.message || "Failed to send code. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await verifyTelegramCode(otp);
      setStep(AuthStep.SUCCESS);
      // Wait a moment for the user to see the success message before closing
      setTimeout(() => {
        onLoginSuccess(username);
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Invalid code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="bg-brand-600 p-6 text-white text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
             X
          </button>
          <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
             <Icons.Send className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-serif font-bold">Creator Login</h2>
          <p className="text-brand-100 text-sm mt-1">Connect via Telegram to verify identity</p>
        </div>

        {/* Body */}
        <div className="p-8">
          
          {step === AuthStep.PHONE_INPUT && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telegram Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">@</span>
                  <input 
                    type="text" 
                    required
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Icons.Smartphone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="tel" 
                    required
                    placeholder="+251 911 234 567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">We will send a verification code to your Telegram account.</p>
              </div>

              {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="animate-pulse">Connecting...</span>
                ) : (
                  <>Send Verification Code <Icons.ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </button>
            </form>
          )}

          {step === AuthStep.OTP_VERIFICATION && (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Code sent to <strong>{username}</strong></p>
                <p className="text-xs text-gray-400">Please check your Telegram app.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Enter 5-Digit Code</label>
                <input 
                  type="text" 
                  maxLength={5}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center text-3xl tracking-[1em] font-bold py-3 border-b-2 border-brand-300 focus:border-brand-600 outline-none"
                  placeholder="•••••"
                />
              </div>

              {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded text-center">{error}</div>}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70"
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </button>

              <button 
                type="button" 
                onClick={() => setStep(AuthStep.PHONE_INPUT)}
                className="w-full text-sm text-gray-500 hover:text-gray-800"
              >
                Wrong number? Go back
              </button>
            </form>
          )}

          {step === AuthStep.SUCCESS && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Successfully Verified!</h3>
              <p className="text-gray-600 mt-2">Welcome to the community.</p>
              <p className="text-xs text-gray-400 mt-4">Redirecting...</p>
            </div>
          )}

        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <Icons.Lock className="w-3 h-3" /> Secure connection via Telegram API
          </p>
        </div>
      </div>
    </div>
  );
};