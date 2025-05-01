import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieHero from "./MovieHero";
import "../css/output/MoviesPageOutput.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [nonPopularMovies, setNonPopularMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/videos/films/")
      .then((response) => {
        const allMovies = response.data;
        const popular = allMovies.filter((movie) => movie.is_popular === true);
        const nonPopular = allMovies.filter((movie) => movie.is_popular !== true);

        setMovies(allMovies);
        setHeroMovie(popular[0]); // default to first popular
        setNonPopularMovies(nonPopular);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error.message);
      });
  }, []);

  const handleSelectMovie = (movie) => {
    setHeroMovie(movie);
    // Smooth scroll to top when changing hero movie
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="text-white bg-black">
      {heroMovie && (
        <MovieHero movie={heroMovie}>
          <div className="flex gap-4">
            {movies
              .filter((m) => m.is_popular)
              .map((movie) => (
                <div 
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie)}
                  className={`flex-shrink-0 w-30 h-48 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${heroMovie?.id === movie.id ? 'ring-4 ring-red-700 scale-105' : 'hover:scale-105'}`}
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Titre}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </MovieHero>
      )}

      {/* Fantasy Section (unchanged) */}
      <div className="bg-black p-5 rounded-xl overflow-hidden m-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Fantasy</h2>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full font-bold hover:bg-red-700 transition">
            See more
          </button>
        </div>

        <div className="flex flex-row gap-4 overflow-x-auto scroll-smooth">
          {nonPopularMovies.map((movie) => (
            <div
              key={movie.id}
              className="w-[150px] rounded-lg transition-transform duration-300 cursor-pointer shadow-lg hover:scale-105 flex-shrink-0"
            >
              <img
                src={movie.Poster}
                alt={movie.Titre}
                className="w-[150px] h-[150px] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviesPage;
