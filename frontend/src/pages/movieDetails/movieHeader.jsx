import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { Play } from 'lucide-react'; 
import Navbar from "../navbar/Navbar";
import {
  FaClock,
  FaCalendar,
} from "react-icons/fa";

const MovieHeader = ({ movie }) => {
  const navigate = useNavigate(); 
  const [showTrailer, setShowTrailer] = useState(false);

    const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  
  if (!movie) {
    return (
      <div className="h-[70vh] bg-gray-900 animate-pulse flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black to-transparent">
            <div className="max-w-4xl mr-5">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {movie?.Titre}
              </h1>

              
              <div className="flex flex-col flex-wrap gap-1 mb-6">
                <div className="bg-yellow-400 text-black px-1 py-1 rounded font-bold w-max">
                  IMDB {movie?.Imdb}/10
                </div>

                {movie?.type === "movie" && (
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

              
              <p className="text-md mb-8 text-gray-300">{movie?.Description}</p>

              
              <div className="flex gap-4">

                  <a 
                    href={movie.Trailer} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    ▶ Watch Trailer
                  </a>
                
                
                  <button
                    onClick={() => navigate(`/watch/${movie.id}`)}
                    className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition flex items-center"
                  >
                    <Play size={20} className="mr-2" />
                    Play Now
                  </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      
      {showTrailer && movie.Trailer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-xl hover:text-gray-300"
            >
              Close
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={movie.Trailer}
                title={`${movie.Titre} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieHeader;