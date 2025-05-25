import React from "react";

const MovieCast = ({ movie }) => {
  const hasActors = Array.isArray(movie?.Actors) && movie.Actors.length > 0;
  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-800 text-white">
      {hasActors ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {movie.Actors.map((actor, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-48 transition-transform "
            >
              <div className="relative rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.7)] ">
                <img
                  src={actor?.Img}
                  alt={actor?.Name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-lg font-semibold text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {actor?.Name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-300 py-12 text-lg">
          No cast information available for this title.
        </div>
      )}
    </div>
  );
};

export default MovieCast;
