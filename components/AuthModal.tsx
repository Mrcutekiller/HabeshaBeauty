import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { AuthStep } from '../types';
import { loginUser } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [step, setStep] = useState<AuthStep>(AuthStep.LOGIN_INPUT);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setStep(AuthStep.LOGIN_INPUT);
      setPhoneNumber('');
      setUsername('');
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await loginUser(phoneNumber, username);
      setStep(AuthStep.SUCCESS);
      
      // Wait a moment for the user to see the success message before closing
      setTimeout(() => {
        onLoginSuccess(username);
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
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
             <Icons.X className="w-6 h-6" />
          </button>
          <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
             <Icons.Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-serif font-bold">Creator Login</h2>
          <p className="text-brand-100 text-sm mt-1">Access your seller dashboard</p>
        </div>

        {/* Body */}
        <div className="p-8">
          
          {step === AuthStep.LOGIN_INPUT && (
            <form onSubmit={handleLogin} className="space-y-4">
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
              </div>

              {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg flex items-start gap-2">
                <Icons.X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <span className="animate-pulse">Logging in...</span>
                ) : (
                  <>Log In <Icons.ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </button>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                By logging in, you agree to our Terms of Service.
              </p>
            </form>
          )}

          {step === AuthStep.SUCCESS && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Icons.Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Welcome Back!</h3>
              <p className="text-gray-600 mt-2">Redirecting to your dashboard...</p>
            </div>
          )}

        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <Icons.Lock className="w-3 h-3" /> Secure Login
          </p>
        </div>
      </div>
    </div>
  );
};