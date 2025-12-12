export interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl: string;
  rating: number;
}

export interface User {
  username: string;
  phoneNumber: string;
  isVerified: boolean;
}

export enum AuthStep {
  PHONE_INPUT = 'PHONE_INPUT',
  OTP_VERIFICATION = 'OTP_VERIFICATION',
  SUCCESS = 'SUCCESS'
}

export interface AuthState {
  isOpen: boolean;
  step: AuthStep;
  phoneNumber: string;
  telegramUsername: string;
  isLoading: boolean;
  error: string | null;
}