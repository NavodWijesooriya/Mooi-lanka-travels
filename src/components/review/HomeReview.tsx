'use client';

import { FaQuoteRight, FaStar, FaUserTie } from 'react-icons/fa';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  Date: string;
}

interface TestimonialProps {
  reviews: Review[];
  loading: boolean;
  error: string;
}

export default function Testimonial({ reviews, loading, error }: TestimonialProps) {
  return (
    <div className="max-w-6xl mx-auto my-12 p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">What Our Clients Say</h2>
      <p className="text-center text-gray-600 mb-10">
        Discover what real people are saying about their experience with Mooi Lanka Travels.
      </p>

      {loading ? (
  <p className="text-center">Loading reviews...</p>
) : error ? (
  <p className="text-center text-red-500">{error}</p>
) : reviews && reviews.length === 0 ? (
  <p className="text-center">No reviews yet.</p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {reviews.map((review) => (
      <div key={review.id} className="p-6 bg-white rounded-lg shadow-lg relative">
        <div className="flex text-yellow-500 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'} />
          ))}
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <FaUserTie className="text-4xl text-gray-600" />
          <div>
            <h4 className="font-semibold text-lg text-gray-800">{review.name}</h4>
            <p className="text-sm text-gray-500">Traveler</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm italic leading-relaxed">{review.comment}</p>
        <FaQuoteRight className="absolute top-4 right-4 text-purple-400 text-2xl" />
        <p className="text-xs text-gray-500 mt-4">{review.Date}</p>
      </div>
    ))}
  </div>
)}

    </div>
  );
}
