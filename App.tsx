import React, { useState } from 'react';
import { Icons } from './components/Icons';
import { TestimonialCard } from './components/TestimonialCard';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { TESTIMONIALS, FEATURES, MOCK_USERS } from './constants';
import { UserProfile, PhotoItem } from './types';

const RECENT_SALES = [
  {
    id: 1,
    title: "Historical Fiction Novel",
    category: "Book Cover",
    price: "5,500 ETB",
    time: "12m ago",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Organic Coffee Campaign",
    category: "Commercial",
    price: "12,000 ETB",
    time: "34m ago",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Exclusive Swimwear Series",
    category: "Fashion Model",
    price: "9,500 ETB",
    time: "1h ago",
    image: "https://images.unsplash.com/photo-1576829777067-152e924d576c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Cultural Lifestyle Magazine",
    category: "Editorial",
    price: "3,800 ETB",
    time: "2h ago",
    image: "https://images.unsplash.com/photo-1534030347209-567898698b6c?auto=format&fit=crop&w=600&q=80"
  }
];

export const App = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [marketplaceItems, setMarketplaceItems] = useState<PhotoItem[]>([]);

  const handleLoginSuccess = (username: string) => {
    // Find mock user or create a fresh one if not found
    const existingUser = MOCK_USERS.find(u => u.username.toLowerCase() === username.toLowerCase());
    
    if (existingUser) {
      setCurrentUser(existingUser);
    } else {
      // Default fallback for generic testing if strict mode was bypassed (unlikely due to authService)
      setCurrentUser({
        username: username,
        phoneNumber: '',
        firstName: 'New',
        lastName: 'User',
        bankName: 'Commercial Bank of Ethiopia (CBE)',
        accountNumber: '',
        stats: { earnings: '0 ETB', photosSold: 0, views: 0 },
        photos: [],
        isNewUser: true
      });
    }
    setCurrentView('dashboard');
  };

  const handleDemoLogin = () => {
    // Specifically log in as messi-love as requested to demonstrate fresh user state
    const specificUser = MOCK_USERS.find(u => u.username === 'messi-love');
    
    if (specificUser) {
      setCurrentUser(specificUser);
      setCurrentView('dashboard');
    } else {
      alert("Demo user not found in configuration.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleNewUpload = (item: PhotoItem) => {
    setMarketplaceItems(prev => [item, ...prev]);
  };

  const navigateToHome = () => setCurrentView('home');
  const navigateToDashboard = () => setCurrentView('dashboard');

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-200">
      
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={navigateToHome}
            >
              <Icons.Camera className="w-6 h-6 text-brand-600" />
              <span className="font-serif text-xl font-bold tracking-tight">Habesha<span className="text-brand-600">Beauty</span></span>
            </div>
            
            {/* Show different nav items based on view */}
            {currentView === 'home' && (
              <div className="hidden md:flex items-center gap-8">
                <a href="#sales" className="text-gray-600 hover:text-brand-600 transition-colors">Live Market</a>
                <a href="#marketplace" className="text-gray-600 hover:text-brand-600 transition-colors">New Arrivals</a>
                <a href="#features" className="text-gray-600 hover:text-brand-600 transition-colors">How it works</a>
              </div>
            )}

            <div>
              {currentUser ? (
                <div className="flex items-center gap-3">
                  {currentView === 'home' ? (
                    <button 
                      onClick={navigateToDashboard}
                      className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-md shadow-brand-100 flex items-center gap-2"
                    >
                      <Icons.LayoutDashboard className="w-4 h-4" /> Dashboard
                    </button>
                  ) : (
                    <button 
                      onClick={navigateToHome}
                      className="text-gray-600 hover:text-brand-600 font-medium text-sm"
                    >
                      Back to Home
                    </button>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-brand-200 transition-all hover:scale-105"
                >
                  Join Now
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {currentView === 'dashboard' && currentUser ? (
        <Dashboard user={currentUser} onLogout={handleLogout} onUpload={handleNewUpload} />
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 left-0 -ml-20 -mt-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-semibold tracking-wide uppercase">
                For Women. By Women.
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Turn your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">Photography</span><br />
                Into Real Income
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
                The exclusive marketplace for Ethiopian women to sell authentic photos. 
                Secure, private, and powered by trusted Telegram verification.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => currentUser ? navigateToDashboard() : handleDemoLogin()}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold rounded-xl shadow-xl shadow-brand-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Icons.Camera className="w-5 h-5" />
                  {currentUser ? "Go to Dashboard" : "Start Selling Today"}
                </button>
                <button 
                  onClick={() => alert("Coming soon! The mobile app is currently under development.")}
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-lg font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Icons.Smartphone className="w-5 h-5" />
                  Get App
                </button>
              </div>
            </div>
          </section>

          {/* Sold Photos Section */}
          <section id="sales" className="py-16 bg-gray-900 border-t border-gray-800">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                   <Icons.TrendingUp className="text-green-400 w-6 h-6" />
                   Just Sold
                 </h2>
                 <span className="text-gray-400 text-sm">Live market updates</span>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {RECENT_SALES.map((item) => (
                   <div key={item.id} className="relative group overflow-hidden rounded-xl bg-gray-800 aspect-[4/5] shadow-lg shadow-black/50">
                     <img 
                       src={item.image} 
                       alt={item.title} 
                       className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-4">
                        <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider transform rotate-3 flex flex-col items-center leading-tight">
                          <span>Sold For</span>
                          <span className="text-white/90 font-normal">{item.category}</span>
                        </div>
                        <p className="text-white font-serif font-medium truncate">{item.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-green-400 font-bold text-sm">{item.price}</p>
                          <span className="text-[10px] text-gray-400">{item.time}</span>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </section>

          {/* MARKETPLACE SECTION FOR BUYERS */}
          {marketplaceItems.length > 0 && (
             <section id="marketplace" className="py-20 bg-brand-50">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                   <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Exclusive Community Content</h2>
                   <p className="text-gray-600">Fresh uploads from our verified creators.</p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                   {marketplaceItems.map((item) => (
                     <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                       <div className="aspect-square bg-gray-100 relative group">
                          {item.mediaType === 'video' ? (
                            <video src={item.url} className="w-full h-full object-cover" controls />
                          ) : (
                            <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                          )}
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-bold text-brand-600 shadow-sm">
                            {item.price}
                          </div>
                       </div>
                       <div className="p-4">
                         <h3 className="font-bold text-gray-900 truncate">{item.title}</h3>
                         <div className="flex justify-between items-center mt-2">
                           <span className="text-xs text-gray-500">{item.date}</span>
                           <button className="text-xs bg-brand-600 text-white px-3 py-1 rounded-full hover:bg-brand-700 transition-colors">
                             Buy Now
                           </button>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </section>
          )}

          {/* Features Grid */}
          <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Why Choose HabeshaBeauty?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">We've built a platform specifically designed for the safety and profitability of our female creators.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {FEATURES.map((feature, idx) => {
                  const Icon = Icons[feature.icon as keyof typeof Icons];
                  return (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-200 transition-colors">
                      <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6 text-brand-600">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section id="reviews" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div className="max-w-2xl">
                  <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-2 block">Community Love</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                    Trusted by 1000+ Ethiopian Creators
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TESTIMONIALS.map((review) => (
                  <TestimonialCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                      <Icons.Camera className="w-6 h-6 text-brand-600" />
                      <span className="font-serif text-xl font-bold">Habesha<span className="text-brand-600">Beauty</span></span>
                  </div>
                  <p className="text-gray-500 max-w-sm">
                    Empowering Ethiopian women through digital creativity. Join the movement today.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">© 2024 HabeshaBeauty. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};