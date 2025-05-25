import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import MovieHeader from "./movieHeader";
import MovieCast from "./movieCast";
import MovieEpisodes from "./movieEpisodes";
import MovieReviews from "./movieReviews";
import MovieRecommendations from "./movieRecommendations";

const MovieDetails = () => {
  const { id } = useParams(); // Get the ID from URL params instead of state
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("cast");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Add console logs to track execution
    console.log("MovieDetails: Fetching movie with ID:", id);

    const fetchMovie = async () => {
      if (!id) {
        console.error("No movie ID provided");
        setLoading(false);
        setError("No movie ID provided");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log(
          `Making API call to: http://localhost:8000/videos/films/${id}/`
        );
        const response = await axios.get(
          `http://localhost:8000/videos/films/${id}/`
        );
        console.log("API response:", response.data);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]); // Re-fetch when ID changes

  // Debug logs
  console.log("MovieDetails state:", { loading, error, movie, activeTab });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
          <p>We couldn't find the movie you're looking for.</p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const tabContent = {
    cast: <MovieCast movie={movie} />,
    episodes: movie.type === "series" ? <MovieEpisodes movie={movie} /> : null,
    reviews: <MovieReviews movie={movie} />,
    recommendations: <MovieRecommendations movieId={movie.id} />,
  };

  return (
    <>
      <MovieHeader movie={movie} />

      <div className="bg-gray-900 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <nav className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab("cast")}
              className={`py-4 px-6 text-sm font-medium transition-colors relative ${
                activeTab === "cast"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Cast
              {activeTab === "cast" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
              )}
            </button>

            {movie.type === "series" && (
              <button
                onClick={() => setActiveTab("episodes")}
                className={`py-4 px-6 text-sm font-medium transition-colors relative ${
                  activeTab === "episodes"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Episodes
                {activeTab === "episodes" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
                )}
              </button>
            )}

            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-6 text-sm font-medium transition-colors relative ${
                activeTab === "reviews"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Reviews
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("recommendations")}
              className={`py-4 px-6 text-sm font-medium transition-colors relative ${
                activeTab === "recommendations"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              You May Also Like
              {activeTab === "recommendations" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
              )}
            </button>
          </nav>
        </div>
      </div>

      <div className="bg-gray-800 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {tabContent[activeTab]}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
