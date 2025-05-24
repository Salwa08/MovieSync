import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Send, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import { postReview, deleteReview } from '../../api/auth';

const MovieReviews = ({ movie }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const { currentUser, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      if (!movie?.id) return;
      
      try {
        const response = await axios.get(`http://localhost:8000/videos/films/${movie.id}/reviews/`);
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movie?.id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    try {
      const newReview = await postReview(movie.id, {
        rating,
        comment
      });
      
      // Add new review to the list
      setReviews([newReview, ...reviews]);
      
      // Reset form
      setRating(0);
      setComment('');
      
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(movie.id, reviewId);
        setReviews(reviews.filter(review => review.id !== reviewId));
      } catch (err) {
        console.error('Error deleting review:', err);
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="p-8 flex justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
    </div>;
  }

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>
      
      {/* Review Form - Only show if logged in */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitReview} className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          
          <div className="mb-4">
            <label className="block mb-2">Your Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-2xl p-1 focus:outline-none"
                >
                  <Star
                    size={24}
                    className={`${
                      (hoverRating || rating) >= star
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-500'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-gray-400">
                {rating > 0 ? `${rating} of 5 stars` : 'Select rating'}
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block mb-2">
              Your Review
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="w-full bg-gray-700 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Share your thoughts about this movie..."
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-6 rounded-full flex items-center gap-2 hover:bg-red-700 transition"
          >
            <Send size={18} />
            Submit Review
          </button>
        </form>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 mb-8 text-center">
          <p className="mb-4">Sign in to leave a review</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-red-600 text-white px-6 py-2 rounded-full"
          >
            Sign In
          </button>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-400">No reviews yet. Be the first to review this movie!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={review.user?.avatar || "https://i.pravatar.cc/150"}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{review.user?.username || "Anonymous"}</div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-500'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-400">
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Show delete button only for user's own reviews */}
                {currentUser && currentUser.id === review.user?.id && (
                  <button 
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              
              <p className="text-gray-300 mt-3">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieReviews;