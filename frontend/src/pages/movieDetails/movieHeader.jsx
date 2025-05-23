import React from "react";
import Navbar from "../navbar/Navbar";
import { FaClock, FaFilm, FaUserTie, FaUsers, FaTv, FaCalendar } from 'react-icons/fa';

const movieHeader = ({movie}) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <div className="text-white bg-black min-h-screen">
      <Navbar />
      <div className="relative w-full text-white">
        <div 
          className="relative h-[90vh] w-full bg-cover transition-all duration-500"
          style={{ 
            backgroundImage: `linear-gradient(
              to bottom,
              rgba(0,0,0,0.8) 0%,
              rgba(0,0,0,0.3) 50%,
              rgba(0,0,0,0.95) 100%
            ),url(${movie?.Poster})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black to-transparent">
            <div className="max-w-4xl mr-5">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie?.Titre}</h1>
              
              {/* Rating and Details */}
              <div className="flex flex-col flex-wrap gap-1 mb-6">
                <div className="bg-yellow-400 text-black px-1 py-1 rounded font-bold w-max">
                  IMDB {movie?.Imdb}/10
                </div>
                
                {movie?.type === 'movie' && (
                  <div className="flex items-center gap-2">
                    <FaClock className="text-white" />
                    {formatDuration(movie?.Duration)}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <FaCalendar className="text-white" />
                  {movie?.ReleaseDate}
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie?.Genre?.map((genre, index) => (
                  <span 
                    key={index}
                    className=" text-white px-3 py-1 rounded-full text-sm bg-red-700 transition-colors cursor-pointe"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-md mb-8 text-gray-300">{movie?.Description}</p>

              

              {/* Action Buttons */}
              <div className="flex gap-4">
                  <a 
                    href={movie.Trailer} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    ▶ Watch Trailer
                  </a>
                
                
                  <a 
                    href={movie.Video} 
                    className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    ▶ Play Now
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default movieHeader;