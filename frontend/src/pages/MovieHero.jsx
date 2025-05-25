import React from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const MovieHero = ({ movie, children, onNext, onPrevious }) => {
  return (
    <div className="relative w-full text-white">
      {/* Large Poster Background */}
      <div
        className="relative h-[100vh] w-full bg-cover transition-all duration-500 bg-[30%_20%]"
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.5) 0%,
            rgba(0,0,0,0.3) 50%,
            rgba(0,0,0,0.95) 100%
          ),url(${movie?.Poster})`,
          backgroundPosition: "center 30%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <button
          className="hidden md:block absolute left-10 top-1/2 z-40 bg-black/50 p-4 rounded-full hover:bg-black/75 transition-all duration-300"
          onClick={onPrevious}
        >
          <IoChevronBackOutline size={30} />
        </button>

          <button
            className="hidden md:block absolute right-10 top-1/2 z-40 bg-black/50 p-4 rounded-full hover:bg-black/75 transition-all duration-300"
            onClick={onNext}
          >
            <IoChevronForwardOutline size={30} />
          </button>

        <div className="absolute left-4 top-20 md:left-20 right-0 p-10 bg-gradient-to-t from-black to-transparent ">
          <div className="max-w-2xl ">
            <h1 className=" text-4xl md:text-5xl font-bold tracking-wider md:tracking-widest mb-4 md:mb-2">
              {movie?.Titre}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-yellow-400 text-black px-2 py-1 rounded font-bold text-sm md:text-md">
                IMDB {movie?.Imdb}/10
              </span>
            </div>
            <p className="text-sm mb-6">{movie?.Description}</p>
            <div className="flex gap-4">
              <a
                href={movie?.Trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block"
              >
                <button className="bg-red-600 md:hover:bg-red-700 border border-white text-white px-6 py-2 rounded-full text-lg font-semibold transition">
                  ▶ Play
                </button>
              </a>
              <button className="hidden md:block bg-black md:hover:bg-gray-600 border border-white text-white px-6 py-2 rounded-full text-lg font-semibold transition">
                + My List
              </button>
              {/*mobile*/}
              <a
                href={movie?.Trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden"
              >
                <button className="bg-white rounded text-black px-5 py-2 text-lg font-semibold ">
                  ▶ Play
                </button>
              </a>
              <a
                href={movie?.Trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden"
              >
                <button className="bg-black/55 rounded text-white px-5 py-2 text-lg font-semibold ">
                  + My List
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-2 md:-bottom-44 w-full ">
        <div className="container mx-auto px-3 md:px-10">
          <div
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
