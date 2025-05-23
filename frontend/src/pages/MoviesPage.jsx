import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieHero from "./MovieHero";
import "../css/output/MoviesPageOutput.css";
import Navbar from "./navbar/Navbar";
import { MdLocalMovies } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faStar, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const scrollbarHideStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [nonPopularMovies, setNonPopularMovies] = useState([]);
  const [justforuMovies, setjustforuMovies] = useState([]);
  const [new_releases, setNewReleases] = useState([]);
  const [trending_now, setTrendingNow] = useState([]);

  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate(`/home/${movie.id}`, { state: { movie } });
  };


  

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    axios
      .get("http://localhost:8000/videos/films/")
      .then((response) => {
        const allMovies = response.data;
        const popular = allMovies.filter((movie) => movie.is_popular === true);
        const nonPopular = allMovies.filter((movie) => movie.is_popular !== true);
        const justforu = allMovies.filter((movie) => movie.category === 'just_for_you');
        const new_releases = allMovies.filter((movie) => movie.category === 'new_releases');
        const trending_now = allMovies.filter((movie) => movie.category === 'trending_now');

        setMovies(allMovies);
        setHeroMovie(popular[1]); 
        setNonPopularMovies(nonPopular);
        setjustforuMovies(justforu);
        setNewReleases(new_releases);
        setTrendingNow(trending_now);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error.message);
      });
  }, [isAuthenticated, navigate]);

  

  const handleSelectMovie = (movie) => {
    setHeroMovie(movie);
    // Smooth scroll to top when changing hero movie
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleNextMovie = () => {
    const popularMovies = movies.filter((m) => m.is_popular);
    const currentIndex = popularMovies.findIndex((m) => m.id === heroMovie.id);
    const nextIndex = (currentIndex + 1) % popularMovies.length;
    setHeroMovie(popularMovies[nextIndex]);
  };

  const handlePreviousMovie = () => {
    const popularMovies = movies.filter((m) => m.is_popular);
    const currentIndex = popularMovies.findIndex((m) => m.id === heroMovie.id);
    const previousIndex = (currentIndex - 1 + popularMovies.length) % popularMovies.length;
    setHeroMovie(popularMovies[previousIndex]);
  };


  return (
    <div className="text-white bg-black min-h-screen">
      <style>{scrollbarHideStyles}</style>
      <Navbar />
      <div className="flex flex-col">
      {heroMovie && (
        <MovieHero 
          movie={heroMovie} 
          onNext={handleNextMovie}
          onPrevious={handlePreviousMovie}
        >
          <div className="relative w-full mb-30">
          <div className="movies-scroll flex gap-6 pt-24 pb-4 px-6 overflow-x-scroll snap-x snap-mandatory scrollbar-hide">
          {movies
              .filter((m) => m.is_popular)
              .map((movie) => (
                <div 
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie)}
                  className={`flex-shrink-0 w-36 md:w-40 md:h-60 rounded-md overflow-hidden ring-1 ring-white cursor-pointer transition-all duration-300 ${
                    heroMovie?.id === movie.id 
                    ? 'translate-y-[-28px] scale-105' 
                    : 'md:hover:scale-105'
                  }`}
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Titre}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
        </MovieHero>
      )}





      {/* SECTIONS */}

      {/* SECTION FANTASY */}

        <div className=" mt-[80px] md:mt-[300px]  p-5 rounded-xl overflow-hidden m-5 ">
          <div className="flex justify-between items-center mb-8 ">
              <h2 className="text-3xl font-bold "><FontAwesomeIcon icon={faWandMagicSparkles} className="inline mr-3"/>Fantasy</h2>
              <Link
                to="/your-target-page"
                className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block"
              >
                See more
              </Link>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex h-72 gap-8 overflow-x-auto hide-scrollbar p-4">
              {nonPopularMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
                  className="flex-none w-44 aspect-[2/3] rounded-lg transition-transform duration-300 cursor-pointer md:hover:scale-105"
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Titre}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div> 

      {/* SECTION JUST FOR YOU */}
        <div className="mt-4  p-5 rounded-xl overflow-hidden m-5 ">
          <div className="flex justify-between items-center mb-8 ">
              <h2 className="text-3xl font-bold "><MdLocalMovies className="inline mr-3"/>Just For You</h2>
              <Link
                to="/your-target-page"
                className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block"
              >
                See more
              </Link>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex h-72 gap-8 overflow-x-auto hide-scrollbar p-4">
              {justforuMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
                  className="flex-none w-44 aspect-[2/3] rounded-lg transition-transform duration-300 cursor-pointer md:hover:scale-105"
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Titre}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div> 



      {/* SECTION NEW RELEASES */}
      <div className="mt-4  p-5 rounded-xl overflow-hidden m-5 ">
          <div className="flex justify-between items-center mb-8 ">
              <h2 className="text-3xl font-bold "><FontAwesomeIcon icon={faStar}  className="inline mr-3"/>New Releases</h2>
              <Link
                to="/your-target-page"
                className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block"
              >
                See more
              </Link>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex h-72 gap-8 overflow-x-auto hide-scrollbar p-4">
              {new_releases.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
                  className="flex-none w-44 aspect-[2/3] rounded-lg transition-transform duration-300 cursor-pointer md:hover:scale-105"
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Titre}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
      </div> 

      {/* SECTION TRENDING NOW */}
      <div className="mt-4  p-5 rounded-xl overflow-hidden m-5 ">
          <div className="flex justify-between items-center mb-8 ">
              <h2 className="text-3xl font-bold ">  <FontAwesomeIcon icon={faBolt} className="inline mr-3"/>Trending Now</h2>
              <Link
                to="/your-target-page"
                className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block"
              >
                See more
              </Link>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex h-72 gap-8 overflow-x-auto hide-scrollbar p-4">
              {trending_now.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
                  className="flex-none w-44 aspect-[2/3] rounded-lg transition-transform duration-300 cursor-pointer md:hover:scale-105"
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Titre}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
      </div> 

      </div>
    </div>
  );
}

export default MoviesPage;
