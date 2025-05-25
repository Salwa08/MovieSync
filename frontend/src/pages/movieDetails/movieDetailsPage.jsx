import React from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import MovieHeader from "./movieHeader";
import MovieCast from "./movieCast";
import MovieEpisodes from "./movieEpisodes";
import MovieReviews from "./movieReviews";
import MovieRecommendations from "./movieRecommendations";

const MovieDetails = (props) => {
  const { state } = useLocation();
  const params = useParams();
  const [movie, setMovie] = React.useState(
    state?.movie || state?.serie || null
  );
  const [loading, setLoading] = React.useState(!state?.movie && !state?.serie);
  const [activeTab, setActiveTab] = React.useState("cast");

  // Determine type from props, state, or URL
  let type = null;
  if (props.isSerie) type = "series";
  else if (movie?.type) type = movie.type;
  else if (window.location.pathname.includes("series")) type = "series";
  else if (window.location.pathname.includes("documentary"))
    type = "documentary";
  else if (window.location.pathname.includes("kids")) type = "kids";
  else type = "movie";

  React.useEffect(() => {
    if (!movie && params.id) {
      setLoading(true);
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
          setMovie(res.data);
          setLoading(false);
          console.log("Fetched movie details:", res.data); // Debug: see what is returned
        })
        .catch(() => setLoading(false));
    }
  }, [movie, params.id, type]);

  if (loading) {
    return (
      <div className="text-white bg-black min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const tabContent = {
    cast: <MovieCast movie={movie} />,
    episodes: type === "series" ? <MovieEpisodes movie={movie} /> : null,
    reviews: <MovieReviews movie={movie} type={type} />,
    recommendations: <MovieRecommendations movieId={movie?.id} />,
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
        <div className="transition-opacity duration-300">
          {tabContent[activeTab]}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
