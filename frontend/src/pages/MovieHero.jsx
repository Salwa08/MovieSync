import React from "react";

const MovieHero = ({ movie, children }) => {  // Added children prop
  return (
    <div className="relative w-full text-white">
      {/* Large Poster Background */}
      <div 
        className="relative h-[70vh] w-full bg-cover bg-center transition-all duration-500"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), url(${movie?.Poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black to-transparent">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-2">{movie?.Titre}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-yellow-400 text-black px-2 py-1 rounded font-bold">
                IMDB {movie?.Imdb}/10
              </span>
              <span className="text-yellow-400">★★★★☆</span>
            </div>
            <p className="text-lg mb-6">{movie?.Description}</p>
            <div className="flex gap-4">
              <a href={movie?.Trailer} target="_blank" rel="noopener noreferrer">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-lg font-semibold transition">
                  ▶ Watch Trailer
                </button>
              </a>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full text-lg font-semibold transition">
                + My List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Selection Banner */}
      <div className="bg-gray-900 px-10 py-6 ">
        <div className="flex gap-4 overflow-x-auto pb-4 ">
          {/* Render children passed from parent */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default MovieHero;