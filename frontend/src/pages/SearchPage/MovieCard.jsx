import React from "react";

function MovieCard({ movie, onClick }) {
  return (
    <div
      className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 border-2 border-transparent hover:border-red-600 flex flex-col"
      onClick={() => onClick && onClick(movie)}
    >
      <div className="relative w-full aspect-[2/3] bg-black flex items-center justify-center">
        <img
          src={
            movie.Poster ||
            movie.poster ||
            "https://via.placeholder.com/200x300?text=No+Image"
          }
          alt={movie.Titre || movie.title}
          className="w-full h-full object-cover object-center rounded-b-none"
          style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.7)" }}
        />
        {/* Favorite/like icon could go here if needed */}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-neutral-400 mb-1">
            {movie.country || movie.Country || "Unknown"}, {movie.release_year}
          </div>
          <h2 className="text-lg font-bold mb-2 text-white truncate">
            {movie.Titre || movie.title}
          </h2>
        </div>
        <div className="flex items-center gap-2 mb-1">
          {movie.imdb_rating && (
            <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded mr-2">
              IMDb
            </span>
          )}
          {movie.imdb_rating && (
            <span className="text-xs text-white font-semibold">
              {movie.imdb_rating} / 100
            </span>
          )}
          {movie.rt_rating && (
            <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-red-400">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
              {movie.rt_rating}%
            </span>
          )}
        </div>
        <div className="text-xs text-neutral-300 truncate">
          {movie.genre || movie.Genre || "Unknown"}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
