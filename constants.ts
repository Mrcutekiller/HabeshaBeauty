import { Review, UserProfile } from './types';

export const TESTIMONIALS: Review[] = [
  {
    id: '1',
    name: "Selamawit Kebede",
    role: "Fashion Model",
    content: "I was skeptical at first, but this platform has changed my life. Connecting via Telegram made it feel so secure. I've sold over 50 photos in my first month!",
    imageUrl: "https://picsum.photos/id/338/200/200", 
    rating: 5
  },
  {
    id: '2',
    name: "Tigist Assefa",
    role: "Lifestyle Creator",
    content: "Finally, a place just for us girls to monetize our content without the noise. The verification process is strict, which keeps the community high quality.",
    imageUrl: "https://picsum.photos/id/64/200/200", 
    rating: 5
  },
  {
    id: '3',
    name: "Hanna Girma",
    role: "Travel Photographer",
    content: "The sign-up was so easy using my Telegram. It feels very local and trusted. I recommend it to all my friends in Addis.",
    imageUrl: "https://picsum.photos/id/65/200/200",
    rating: 4
  },
  {
    id: '4',
    name: "Marta Tesfaye",
    role: "Digital Artist",
    content: "Income transparency is amazing here. I love that I get paid directly. Best platform in Ethiopia for female creators right now.",
    imageUrl: "https://picsum.photos/id/342/200/200",
    rating: 5
  }
];

export const FEATURES = [
  {
    title: "Women-Only Community",
    description: "A safe, exclusive space dedicated to empowering female creators and models.",
    icon: "Users"
  },
  {
    title: "Secure Telegram Login",
    description: "We use Telegram verification to ensure every user is real and authenticated securely.",
    icon: "Shield"
  },
  {
    title: "Instant Payouts",
    description: "Get paid for your photos instantly through local banking integrations.",
    icon: "CreditCard"
  }
];

export const MOCK_USERS: UserProfile[] = [
  {
    username: 'messi-love',
    phoneNumber: '+251975594607',
    firstName: 'Messi',
    lastName: 'Love',
    bankName: 'Commercial Bank of Ethiopia (CBE)',
    accountNumber: '',
    stats: { earnings: '0 ETB', photosSold: 0, views: 0 },
    photos: [],
    isNewUser: true
  },
  {
    username: 'hanna_g',
    phoneNumber: '+251911234567',
    firstName: 'Hanna',
    lastName: 'Girma',
    bankName: 'Dashen Bank',
    accountNumber: '100023456789',
    stats: { earnings: '12,450 ETB', photosSold: 42, views: 1205 },
    photos: [
      { id: 1, url: 'https://picsum.photos/id/1011/300/300', price: '450 ETB', status: 'Sold', date: '2 hours ago', title: 'Lake Tana Sunset' },
      { id: 2, url: 'https://picsum.photos/id/1027/300/300', price: '500 ETB', status: 'Active', date: '1 day ago', title: 'Traditional Portrait' },
      { id: 3, url: 'https://picsum.photos/id/1012/300/300', price: '350 ETB', status: 'Active', date: '3 days ago', title: 'Addis Street Life' },
      { id: 4, url: 'https://picsum.photos/id/1013/300/300', price: '500 ETB', status: 'Sold', date: '1 week ago', title: 'Coffee Ceremony' },
    ]
  },
  {
    username: 'sara_design',
    phoneNumber: '+251922334455',
    firstName: 'Sara',
    lastName: 'Bekele',
    bankName: 'Awash Bank',
    accountNumber: '00345678901',
    stats: { earnings: '45,200 ETB', photosSold: 156, views: 5400 },
    photos: [
      { id: 101, url: 'https://picsum.photos/id/1015/300/300', price: '500 ETB', status: 'Sold', date: '1 day ago', title: 'Mountain Landscape' },
      { id: 102, url: 'https://picsum.photos/id/1016/300/300', price: '480 ETB', status: 'Active', date: '2 days ago', title: 'River Valley' },
    ]
  },
  {
    username: 'betty_style',
    phoneNumber: '+251933445566',
    firstName: 'Betty',
    lastName: 'Alemu',
    bankName: 'Telebirr',
    accountNumber: '933445566',
    stats: { earnings: '8,900 ETB', photosSold: 23, views: 890 },
    photos: [
      { id: 201, url: 'https://picsum.photos/id/1025/300/300', price: '300 ETB', status: 'Active', date: '5 hours ago', title: 'Fashion Shoot' },
    ]
  }
];