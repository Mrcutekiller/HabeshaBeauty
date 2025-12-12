import { Review } from './types';

export const TESTIMONIALS: Review[] = [
  {
    id: '1',
    name: "Selamawit Kebede",
    role: "Fashion Model",
    content: "I was skeptical at first, but this platform has changed my life. Connecting via Telegram made it feel so secure. I've sold over 50 photos in my first month!",
    imageUrl: "https://picsum.photos/id/338/200/200", // Placeholder representing a portrait
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