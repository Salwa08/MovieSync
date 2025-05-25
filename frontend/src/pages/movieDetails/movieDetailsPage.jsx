import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import MovieHeader from "./movieHeader";
import MovieCast from "./movieCast";
import MovieEpisodes from "./movieEpisodes";
import MovieReviews from "./movieReviews";
import MovieRecommendations from "./movieRecommendations";

const MovieDetails = (props) => {
  const { state } = useLocation();
  const params = useParams();
  // Force null initial state to ensure loading on navigation
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cast");
  const [error, setError] = useState(null);

  // Determine type from props, state, or URL
  let type = null;
  if (props.isSerie) type = "series";
  else if (movie?.type) type = movie.type;
  else if (window.location.pathname.includes("series")) type = "series";
  else if (window.location.pathname.includes("documentary"))
    type = "documentary";
  else if (window.location.pathname.includes("kids")) type = "kids";
  else type = "movie";

  // Use state.movie if available on navigation
  useEffect(() => {
    if (state?.movie) {
      console.log("Using movie from navigation state:", state.movie);
      setMovie(state.movie);
      setLoading(false);
    }
  }, [state]);

  // Always fetch fresh data when params.id changes, but only if state.movie is not present
  useEffect(() => {
    if (!params.id) return;
    if (state?.movie) return; // Don't fetch if we already have the movie from navigation

    // If we have state.movie, clear any previous error
    if (state?.movie && error) setError(null);

    console.log(`Fetching movie with ID: ${params.id}`);
    setLoading(true);

    // Build the URL based on content type
    let url = "";
    if (type === "series")
      url = `http://localhost:8000/videos/series/${params.id}/`;
    else if (type === "documentary")
      url = `http://localhost:8000/videos/documentary/${params.id}/`;
    else if (type === "kids")
      url = `http://localhost:8000/videos/kids/${params.id}/`;
    else url = `http://localhost:8000/videos/films/${params.id}/`;

    axios
      .get(url)
      .then((res) => {
        console.log("Fetched movie details:", res.data);
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err);
        // Only show error if we don't have state.movie
        if (!state?.movie) {
          setError("Failed to load movie details");
        } else {
          setError(null); // If we have state.movie, clear error
        }
        setLoading(false);
      });
  }, [params.id, type, state]); // Remove 'movie' from dependencies to prevent conflicts

  // Debug logs
  console.log("MovieDetails state:", {
    loading,
    error,
    movie,
    activeTab,
    type,
  });

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
          <h2 className="text-2xl font-bold mb-4">Content Not Found</h2>
          <p>We couldn't find what you're looking for.</p>
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
    episodes: type === "series" ? <MovieEpisodes movie={movie} /> : null,
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

            {type === "series" && (
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
