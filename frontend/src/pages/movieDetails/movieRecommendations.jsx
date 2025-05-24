import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieRecommendations = ({ movieId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:8000/videos/films/${movieId}/recommendations/`)
      .then((res) => {
        setRecommendations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recommendations:", err);
        setRecommendations([]);
        setLoading(false);
      });
  }, [movieId]);

  const handleMovieClick = (movie) => {
    // Force a fresh page load to ensure we get new data
    window.location.href = `/home/${movie.id}`;
  };

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  if (!movieId) return null;

  if (loading)
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Recommendations</h2>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-700 h-80 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );

  if (recommendations.length === 0) return null;

  // Group recommendations into rows of 4
  const rows = chunkArray(recommendations, 4);

  return (
    <div className="flex flex-col items-center">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
        >
          {row.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer transform transition-transform hover:scale-105 m-5"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="relative h-64 w-56 rounded-lg overflow-hidden">
                <img
                  src={movie.Poster}
                  alt={movie.Titre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150x225?text=No+Image";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-sm font-bold">
                      ★ {movie.Imdb.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MovieRecommendations;
