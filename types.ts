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

export interface PhotoItem {
  id: number;
  url: string;
  price: string;
  status: 'Active' | 'Sold';
  date: string;
  title?: string;
}

export interface UserStats {
  earnings: string;
  photosSold: number;
  views: number;
}

export interface UserProfile {
  username: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  bankName: string;
  accountNumber: string;
  stats: UserStats;
  photos: PhotoItem[];
  isNewUser?: boolean;
}