import React from 'react';
import { Review } from '../types';
import { Icons } from './Icons';

interface TestimonialCardProps {
  review: Review;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <img 
          src={review.imageUrl} 
          alt={review.name} 
          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-brand-100"
        />
        <div>
          <h4 className="font-bold text-gray-900">{review.name}</h4>
          <p className="text-sm text-brand-600 font-medium">{review.role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Icons.Star 
            key={i} 
            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <p className="text-gray-600 italic leading-relaxed">"{review.content}"</p>
      <div className="mt-4 flex items-center text-xs text-green-600 font-semibold">
        <Icons.Check className="w-3 h-3 mr-1" /> Verified Seller
      </div>
    </div>
  );
};