import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import MovieHeader from './movieHeader';
import MovieCast from './movieCast';
import MovieEpisodes from './movieEpisodes';
import MovieReviews from './movieReviews';
import MovieRecommendations from './movieRecommendations';

const MovieDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('cast');

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        // Update to use the correct URL that matches your Django URLs
        // Your Django URL is 'films/<int:film_id>/' NOT 'film/<int:id>/'
        const response = await axios.get(`http://localhost:8000/videos/films/${id}/`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (state && state.movie) {
      setMovie(state.movie);
      setLoading(false);
    } else {
      fetchMovie();
    }
    
    // Reset active tab when movie changes
    setActiveTab('cast');
    
  }, [id, state]); // Make sure id is a dependency

  const tabContent = {
    cast: <MovieCast movie={movie} />,
    episodes: <MovieEpisodes movie={movie} />,
    reviews: <MovieReviews movie={movie} />,
    recommendations: <MovieRecommendations movieId={movie?.id} />
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Movie not found</h2>
          <p className="mt-2">The movie you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <MovieHeader movie={movie} />
      
      <div className="bg-gray-900 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <nav className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('cast')}
              className={`py-4 px-6 text-sm font-medium transition-colors relative ${
                activeTab === 'cast'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Cast
              {activeTab === 'cast' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
              )}
            </button>
            
            {movie?.type === 'series' && (
              <button
                onClick={() => setActiveTab('episodes')}
                className={`py-4 px-6 text-sm font-medium transition-colors relative ${
                  activeTab === 'episodes'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Episodes
                {activeTab === 'episodes' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
                )}
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-6 text-sm font-medium transition-colors relative ${
                activeTab === 'reviews'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Reviews
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`py-4 px-6 text-sm font-medium transition-colors relative ${
                activeTab === 'recommendations'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              You May Also Like
              {activeTab === 'recommendations' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
              )}
            </button>
          </nav>
        </div>
      </div>
      
      <div className="bg-gray-800 min-h-[500px]">
        <div className="transition-opacity duration-300">
          {tabContent[activeTab]}
        </div>
      </div>
      
      
    </>
  );
};

export default MovieDetails;