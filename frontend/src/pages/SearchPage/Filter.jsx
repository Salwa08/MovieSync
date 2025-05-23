import React, { useState } from "react";

const GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Romance",
  "Documentary",
  "Animation",
];

function Filter({ onApply, onReset, loading }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [releaseYear, setReleaseYear] = useState(2000);
  const [rating, setRating] = useState(0);

  const handleGenreClick = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleApply = () => {
    onApply &&
      onApply({
        genre: selectedGenres.join(","),
        release_year: releaseYear,
        rating,
      });
  };

  const handleReset = () => {
    setSelectedGenres([]);
    setReleaseYear(2000);
    setRating(0);
    onReset && onReset();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-72 text-black">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <div className="font-semibold mb-2">Genre</div>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => (
            <button
              key={genre}
              type="button"
              className={`px-3 py-1 rounded-full border text-sm font-medium transition-all ${
                selectedGenres.includes(genre)
                  ? "bg-red-100 border-red-400 text-red-700"
                  : "bg-gray-100 border-gray-300 text-gray-700"
              }`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
      <hr className="my-3" />
      <div className="mb-4">
        <div className="font-semibold mb-2">Release Year</div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-red-600 text-base">
            {releaseYear}
          </span>
          <input
            type="range"
            min="1950"
            max={new Date().getFullYear()}
            value={releaseYear}
            onChange={(e) => setReleaseYear(Number(e.target.value))}
            className="flex-1 accent-red-400"
          />
        </div>
      </div>
      <hr className="my-3" />
      <div className="mb-4">
        <div className="font-semibold mb-2">Rating</div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="text-2xl text-gray-300 hover:text-yellow-400 focus:outline-none"
              onClick={() => setRating(star)}
              aria-label={`Set rating to ${star}`}
            >
              <span>{star <= rating ? "★" : "☆"}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          type="button"
          className="flex-1 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
          onClick={handleReset}
          disabled={loading}
        >
          Reset
        </button>
        <button
          type="button"
          className="flex-1 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700"
          onClick={handleApply}
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply Filter"}
        </button>
      </div>
    </div>
  );
}

export default Filter;
