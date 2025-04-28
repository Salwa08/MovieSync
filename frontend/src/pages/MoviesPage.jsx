import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/movies/')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div className="movies-page">
      <h1>Movies</h1>
      <div className="movies-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img src={`http://localhost:8000${movie.thumbnail}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesPage;
