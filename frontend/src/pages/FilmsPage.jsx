import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/output/MoviesPageOutput.css";
import Navbar from "./navbar/Navbar";
import { MdLocalMovies } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faStar,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./LandingPage/Footer";
import { useUser } from "../contexts/UserContext";

const scrollbarHideStyles = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

function FilmsPage() {
  const [movies, setMovies] = useState([]);
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
      navigate("/login");
    }
    axios
      .get("http://localhost:8000/videos/films/")
      .then((response) => {
        const allMovies = response.data;
        const popular = allMovies.filter((movie) => movie.is_popular === true);
        const nonPopular = allMovies.filter(
          (movie) => movie.is_popular !== true
        );
        const justforu = allMovies.filter(
          (movie) => movie.category === "just_for_you"
        );
        const new_releases = allMovies.filter(
          (movie) => movie.category === "new_releases"
        );
        const trending_now = allMovies.filter(
          (movie) => movie.category === "trending_now"
        );
        setMovies(allMovies);
        setNonPopularMovies(nonPopular);
        setjustforuMovies(justforu);
        setNewReleases(new_releases);
        setTrendingNow(trending_now);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error.message);
      });
  }, [isAuthenticated, navigate]);

  return (
    <div className="text-white bg-black min-h-screen">
      <style>{scrollbarHideStyles}</style>
      <Navbar />
      <div className="flex flex-col">
        {/* SECTION FANTASY */}
        <div className="mt-[80px] md:mt-[120px] p-5 rounded-xl overflow-hidden m-5 ">
          <div className="flex justify-between items-center mb-8 ">
            <h2 className="text-3xl font-bold ">
              <FontAwesomeIcon
                icon={faWandMagicSparkles}
                className="inline mr-3"
              />
              Fantasy
            </h2>
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
            <h2 className="text-3xl font-bold ">
              <MdLocalMovies className="inline mr-3" />
              Just For You
            </h2>
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
            <h2 className="text-3xl font-bold ">
              <FontAwesomeIcon icon={faStar} className="inline mr-3" />
              New Releases
            </h2>
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
            <h2 className="text-3xl font-bold ">
              <FontAwesomeIcon icon={faBolt} className="inline mr-3" />
              Trending Now
            </h2>
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
      <Footer />
    </div>
  );
}

export default FilmsPage;
