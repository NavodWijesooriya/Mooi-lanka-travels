'use client';

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const Review = () => {
  interface Review {
    rating: number;
    comment: string;
    name: string;
    email: string;
  }

  const [newReview, setNewReview] = useState<Review>({
    rating: 0,
    comment: '',
    name: '',
    email: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmitReview = async () => {
    // Don't block if rating is 0, but ensure that comment and name are provided
    if (!newReview.comment.trim() || !newReview.name.trim()) {
      return;
    }

    setSubmitting(true);

    try {
      const reviewData = {
        ...newReview,
        Date: formatDate(new Date()),
      };

      await addDoc(collection(db, 'reviews'), reviewData);

      alert('Thank you for your review!');
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to submit review. Please check Firestore rules.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-10 m-10">
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-4">Write a Review</h3>

          <div className="form-control">
            <label className="label"><span className="label-text">Your Name</span></label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              value={newReview.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Your Email</span></label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={newReview.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control mt-4">
            <label className="label"><span className="label-text">Rating</span></label>
            <div className="rating rating-lg">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  checked={star === newReview.rating}
                  onChange={() => handleRatingChange(star)}
                />
              ))}
            </div>
          </div>

          <div className="form-control mt-4">
            <label className="label"><span className="label-text">Your Review</span></label>
            <textarea
              name="comment"
              className="textarea textarea-bordered h-24"
              placeholder="Write your review here..."
              value={newReview.comment}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="card-actions justify-end mt-6">
            <button
              className="btn btn-primary"
              onClick={handleSubmitReview}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
