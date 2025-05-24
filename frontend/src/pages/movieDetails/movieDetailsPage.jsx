import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import MovieHeader from "./movieHeader";
import MovieCast from "./movieCast";
import MovieEpisodes from "./movieEpisodes";
import MovieReviews from "./movieReviews";
import MovieRecommendations from "./movieRecommendations";

const MovieDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [movie, setMovie] = useState(state?.movie || null);
  const [loading, setLoading] = useState(!state?.movie);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("cast");

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:8000/videos/film/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch movie details");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
    // eslint-disable-next-line
  }, [id]);

  const tabContent = {
    cast: <MovieCast movie={movie} />,
    episodes: <MovieEpisodes movie={movie} />,
    reviews: <MovieReviews movie={movie} />,
    recommendations: <MovieRecommendations movie={movie} />,
  };

  if (loading)
    return <div className="text-center py-10 text-gray-400">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!movie)
    return (
      <div className="text-center py-10 text-gray-400">Movie not found.</div>
    );

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

            {movie?.type === "series" && (
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
        <div className="transition-opacity duration-300">
          {tabContent[activeTab]}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
