import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/videos/get-movies/"
        );

        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log("Fetched movies:", data);
        setMovies(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getDisplayedMovies = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      return movies.slice(0, 24); // Show 24 posters for large screens
    } else if (screenWidth >= 768) {
      return movies.slice(0, 18); // Show 18 posters for medium screens
    } else {
      return movies.slice(0, 12); // Show 12 posters for small screens
    }
  };

  const displayedMovies = getDisplayedMovies();

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col mt-[-91px] bg-[#141414]" id="home">
      
      <div className="absolute top-0 left-0 right-0 w-full grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 opacity-90 bg-[#141414]">
        {displayedMovies.map((movie) => (
          <div
            key={movie.id}
            className="aspect-[2/3] overflow-hidden rounded-lg"
          >
            {isLoading ? (
              <div className="w-full h-full bg-[#1F1F1F] animate-pulse rounded-lg" />
            ) : (
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image+Available"
                }
                alt={movie.title || `Movie thumbnail ${movie.id}`}
                className="object-cover w-full h-full rounded-lg"
              />
            )}
          </div>
        ))}
      </div>

     
      <div className="absolute inset-0 z-10 pt-[91px]" style={{
        background: 'linear-gradient(to bottom, rgba(23,23,23,0.9), rgba(23,23,23,0.6), rgba(23,23,23,0.9), rgba(23,23,23,1))'
      }} />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-12 md:bottom-30 flex flex-col items-center justify-end text-center px-4 z-20">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          The Best Streaming Experience
        </h1>
        <p className="max-w-2xl text-gray-300 mb-8">
          MovieSync is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With MovieSync, you can enjoy
          a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more.
          Watch movies and shows with friends in real-time, no matter where they are.
        </p>
        <Button
          className="bg-[#E50000] hover:bg-red-700 text-white flex items-center gap-2 px-6 py-3 text-lg font-medium"
          onClick={() => navigate("/register")}
        >
          <Play className="h-5 w-5" />
          Start Watching Now
        </Button>
      </div>

      {error && (
        <div className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded z-50">
          {error}
        </div>
      )}
    </section>
  );
}

export default HeroSection;