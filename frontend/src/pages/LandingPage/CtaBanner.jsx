import React, { useEffect, useState } from "react";

function CtaBanner() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/videos/get-movies/"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMovies(data || []);
      } catch (err) {
        setError("Failed to fetch posters");
      }
    };
    fetchMovies();
  }, []);

  
  const displayedMovies = movies;

  return (
    <div className="flex flex-col mt-16 mb-16 w-full max-w-[1124px] mx-auto max-md:px-2 max-md:mt-8 max-md:mb-8">
      <div
        className="flex overflow-hidden relative gap-10 items-center px-8 py-16 w-full rounded-xl border border-solid bg-stone-950 border-neutral-800 max-md:px-3 max-md:max-w-full min-h-[230px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, #0F0F0F 2%, #140F0F 16%, #220E0E 28%, #E50000 100%)",
          maskImage:
            "linear-gradient(90deg, #0F0F0F 2%, #140F0F 16%, #220E0E 28%, #E50000 100%)",
        }}
      >
        
        <div className="absolute inset-0 z-0 grid grid-rows-4 grid-flow-col auto-cols-max w-full h-full overflow-hidden gap-2">
          {displayedMovies.map((movie, idx) => (
            <img
              key={movie.id || idx}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/124x75?text=No+Image"
              }
              alt={movie.title || `Movie thumbnail ${movie.id}`}
              className="object-cover w-[124px] h-[75px] rounded-md"
            />
          ))}
        </div>

        
        <div
          className="absolute inset-0 z-10 pointer-events-none rounded-xl"
          style={{
            background:
              "linear-gradient(90deg, #0F0F0F 0%, #140F0FF9 30%, #220E0EE8 60%, #E5000000 100%)",
          }}
        />

     
        <div className="z-10 flex-1 shrink self-stretch my-auto basis-10 min-w-60 max-md:max-w-full px-16 py-20">
          <h2 className="text-3xl font-bold text-white max-md:max-w-full">
            Start your free trial today!
          </h2>
          <p className="mt-2.5 text-base text-neutral-400 max-md:max-w-full">
            This is a clear and concise call to action that encourages users to
            sign up for a free trial of MovieSync.
          </p>
        </div>

        <button className="z-10 gap-2.5 self-stretch px-5 py-3.5 my-auto text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
          Start a Free Trial
        </button>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

export default CtaBanner;
