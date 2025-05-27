// Favourites list: user's favourite movies
import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const FavouritesList = ({ favourites, handleUnfavourite }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <FaHeart className="text-red-500 w-5 h-5 mr-2" />
      Favourites
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {favourites && favourites.length > 0 ? (
        favourites.map((movie, index) => (
          <div
            key={`favourite-${movie.id}-${index}`}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-md mb-2">
              <Link to={`/film/${movie.id}`} state={{ movie }}>
                <img
                  src={
                    movie.poster ||
                    movie.Poster ||
                    "https://via.placeholder.com/60x90?text=Movie"
                  }
                  alt={movie.title || movie.Titre}
                  className="object-cover group-hover:scale-105 transition-transform w-full h-full"
                />
              </Link>
              
              <button
                className="absolute top-2 right-2 z-10 rounded-full p-2 bg-red-600 hover:bg-neutral-800/80 transition-opacity"
                aria-label="Remove from favourites"
                onClick={() => handleUnfavourite(movie)}
                style={{ lineHeight: 0 }}
              >
                <FaHeart className="h-5 w-5 text-white" />
              </button>
            </div>
            <h3 className="font-medium text-sm">
              {movie.title || movie.Titre}
            </h3>
            {movie.genre || movie.Genre ? (
              <p className="text-xs text-gray-400 truncate max-w-full">
                {(movie.genre || movie.Genre)
                  ?.toString()
                  .replace(/\s*,\s*/g, ", ")
                  .replace(/,+/g, ",")}
              </p>
            ) : null}
          </div>
        ))
      ) : (
        <div className="text-gray-400 col-span-full">No favourites yet.</div>
      )}
    </div>
  </div>
);

export default FavouritesList;
