import React from "react";

const ContinueWatching = ({ recentMovies }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    {recentMovies
      .filter((movie) => movie.progress && movie.progress < 100)
      .map((movie, index) => (
        <div
          key={`continue-${movie.id}-${index}`}
          className="group cursor-pointer"
        >
          <div className="relative aspect-[2/3] overflow-hidden rounded-md mb-2">
            <img
              src={
                movie.poster ||
                movie.Poster ||
                "https://via.placeholder.com/60x90?text=Movie"
              }
              alt={movie.title || movie.Titre}
              className="object-cover group-hover:scale-105 transition-transform w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900/90 p-2">
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div
                  className="bg-red-600 h-1 rounded-full"
                  style={{ width: `${movie.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-white mt-1">
                {movie.progress}% complete
              </div>
            </div>
          </div>
          <h3 className="font-medium text-sm">{movie.title || movie.Titre}</h3>
          <p className="text-xs text-gray-400">{movie.genre || movie.Genre}</p>
        </div>
      ))}
  </div>
);

export default ContinueWatching;
