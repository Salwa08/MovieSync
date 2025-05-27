import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Send, Trash2, AlertTriangle, X } from "lucide-react";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import { postReview, deleteReview } from "../../api/auth";

const MovieReviews = ({ movie }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const { currentUser, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      if (!movie?.id) return;
      setLoading(true);
      try {
        let url;
        if (movie.type === "series") {
          url = `http://localhost:8000/videos/series/${movie.id}/reviews/`;
        } else {
          url = `http://localhost:8000/videos/films/${movie.id}/reviews/`;
        }
        const response = await axios.get(url);
        
        let data = response.data;
        if (Array.isArray(data)) {
          setReviews(data);
        } else if (Array.isArray(data.results)) {
          setReviews(data.results);
        } else {
          setReviews([]);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movie?.id, movie?.type]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    try {
      let newReview;
      if (movie.type === "series") {
        newReview = await postReview(
          movie.id,
          {
            rating,
            comment,
          },
          "series"
        );
      } else {
        newReview = await postReview(movie.id, {
          rating,
          comment,
        });
      }
      setReviews([newReview, ...reviews]);
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    }
  };

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!reviewToDelete) return;

    try {
      await deleteReview(movie.id, reviewToDelete.id);
      setReviews(reviews.filter((review) => review.id !== reviewToDelete.id));
      setShowDeleteModal(false);
      setReviewToDelete(null);
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review. Please try again.");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

 
  if (reviews.length > 0 && currentUser) {
    console.log(
      "Liste des IDs des reviews et currentUser.id:",
      reviews.map((r) => [r.user?.id, typeof r.user?.id]),
      "currentUser.id:",
      currentUser.id,
      typeof currentUser.id
    );
  }

  if (reviews.length > 0) {
    console.log("currentUser:", currentUser);
  }

  return (
    <div className="p-8 text-white">
     
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          
          <div className="absolute inset-0 bg-black bg-opacity-75"></div>

          <div className="relative bg-gray-900 rounded-lg w-full max-w-md mx-4 border-2 border-red-600 overflow-hidden">
            
            <div className="bg-red-600 px-4 py-3 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center">
                <AlertTriangle size={20} className="mr-2" />
                Delete Review
              </h3>
              <button
                onClick={cancelDelete}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-white mb-6">
                Are you sure you want to delete this review? This action cannot
                be undone.
              </p>

              
              <div className="bg-gray-800 p-3 rounded-md mb-6">
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < reviewToDelete?.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {reviewToDelete?.comment}
                </p>
              </div>

              
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        {reviews.length === 0 ? (
          <p className="text-gray-400">
            No reviews yet. Be the first to review this movie!
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-gray-800 rounded-lg p-4 mx-8">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium">{review.user?.username}</div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-500"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-400">
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                  </div>
                </div>

                {currentUser && currentUser.id === review.user?.id && (
                  <button
                    onClick={() => handleDeleteClick(review)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <p className="text-gray-300 ">{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {isAuthenticated ? (
        <form
          onSubmit={handleSubmitReview}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <div className="mb-4">
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
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-500"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-gray-400">
                {rating > 0 ? `${rating} of 5 stars` : ""}
              </span>
            </div>
          </div>
          <div className="mb-4">
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
            onClick={() => navigate("/login")}
            className="bg-red-600 text-white px-6 py-2 rounded-full"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieReviews;
