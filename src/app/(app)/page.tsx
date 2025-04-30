'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import MainLayout from '@/components/layout/MainLayout';
import Footer from '@/components/common/footer/Footer';
import Gallery from '@/components/product/gallery/Gallery';
import EmblaCarousel from '@/components/Events/EmblaCarousel';
import Title from '@/components/Title/Title';
import Button from '@/components/common/button/Button';
import { FaQuoteRight, FaStar, FaUserTie } from 'react-icons/fa';
import Slider from "@/components/common/slider/Slider"
import FillHome from "@/components/FillHome";
import HomePageContent from '@/components/HomePageContent'
import HomePackage from '@/components/HomePackage/HomePackage';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  Date: string;
}

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const reviewRef = collection(db, 'reviews');

    const unsubscribe = onSnapshot(
      reviewRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Review[];

        setReviews(data);
        setLoading(false);
      },
      (err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch reviews.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div data-theme="light">
      <MainLayout />
      <Slider />

      <HomePageContent />
      
      <Title title="Mooi Lanka  Travels" />
      <EmblaCarousel />
      <FillHome />
      <Title title="" />
      <Gallery Gallerylimits={6} />
      <Button name="View More" url="/places" />

      {/* 🚀 Testimonial Section */}
      <div className="max-w-6xl mx-auto my-12 p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">What Our Customers Say</h2>
        <p className="text-center text-gray-600 mb-10">
          Discover what real people are saying about their experience with Jagath Tours & Travels.
        </p>

        {loading ? (
          <p className="text-center">Loading reviews...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : reviews.length === 0 ? (
          <p className="text-center">No reviews yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 bg-white rounded-lg shadow-lg relative">
                {/* Conditionally render stars only if rating is greater than 0 */}
                {review.rating > 0 && (
                  <div className="flex text-yellow-500 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                )}

                {/* User Info */}
                <div className="flex items-center space-x-4 mb-4">
                  <FaUserTie className="text-4xl text-gray-600" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-500">Traveler</p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm italic leading-relaxed">{review.comment}</p>

                {/* Quote Icon */}
                <FaQuoteRight className="absolute top-4 right-4 text-purple-400 text-2xl" />

                {/* Date */}
                <p className="text-xs text-gray-500 mt-4">{review.Date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
