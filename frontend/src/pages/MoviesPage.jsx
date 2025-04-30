import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/videos/films/')
      .then(response => {
        console.log('Fetched movies:', response.data);
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch movies:', error.message);
      });
  }, []);

  return (
    <div className="bg-black p-5 text-white rounded-xl overflow-hidden m-5">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">Fantasy</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded-full font-bold hover:bg-red-700 transition">
          See more
        </button>
      </div>

      <div className="flex flex-row gap-4 overflow-x-auto scroll-smooth">
        {movies.map((movie) => (
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

  );
  
}

export default MoviesPage;
