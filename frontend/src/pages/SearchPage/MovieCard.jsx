import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function MovieCard({ movie, userToken }) {
  const [hearted, setHearted] = useState(false);

  // Optionally, fetch initial hearted state from a parent or context

  const handleHeartClick = async (e) => {
    e.preventDefault(); // Prevent navigating to movie page

    if (!hearted) {
      // Add to favourites
      const res = await fetch("http://localhost:8000/videos/favourites/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ film: movie.id }),
      });
      const data = await res.json();
      console.log("Add favourite response:", res.status, data);
      if (res.ok) setHearted(true);
      else alert(data.error || "Failed to add favourite");
    } else {
      // Remove from favourites
      const res = await fetch(
        `http://localhost:8000/videos/favourites/remove/${movie.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const data = await res.json();
      console.log("Remove favourite response:", res.status, data);
      if (res.ok) setHearted(false);
      else alert(data.error || "Failed to remove favourite");
    }
  };

  return (
    <div className="group h-full flex flex-col">
      <Link to={`/movie/${movie.id}`} className="block h-full">
        <div className="relative aspect-[2/3] overflow-hidden rounded-md mb-3 group-hover:scale-105 transition-transform w-full">
          <img
            src={
              movie.Poster ||
              movie.poster ||
              (movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/250x370?text=No+Image")
            }
            alt={movie.Titre || movie.title}
            className="object-cover w-full h-full"
            style={{ minHeight: 200 }}
          />
          {/* Heart icon button, visible on hover */}
          <button
            className={`absolute top-2 right-2 rounded-full p-2 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 ${
              hearted ? "bg-red-600" : "bg-neutral-800/80"
            }`}
            onClick={handleHeartClick}
            aria-label={
              hearted ? "Remove from favourites" : "Add to favourites"
            }
          >
            <FaHeart
              className={`h-5 w-5 transition-colors ${
                hearted ? "text-white" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </Link>
      <div className="flex-1 flex flex-col justify-between space-y-1">
        <div className="text-xs text-gray-400 font-bold min-h-[18px] flex items-center">
          {movie.ReleaseDate
            ? new Date(movie.ReleaseDate).getFullYear()
            : movie.release_year || "-"}
        </div>
        <h3 className="font-bold text-lg line-clamp-2 min-h-[48px] flex items-center">
          {movie.Titre || movie.title}
        </h3>
        <div className="flex justify-between items-center min-h-[28px]">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 text-black text-xs px-1 rounded font-bold">
              IMDb
            </div>
            <span className="text-xs font-bold">
              {movie.Imdb || movie.imdb_rating || "-"} / 10
            </span>
          </div>
          {/* Tomato score, if available */}
          {movie.rt_rating && (
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-1"></span>
              <span className="text-xs font-bold text-gray-300">
                {movie.rt_rating}%
              </span>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-400 font-bold min-h-[18px] flex items-center">
          {Array.isArray(movie.Genre)
            ? movie.Genre.join(", ")
            : movie.genre || movie.Genre || "Unknown"}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
