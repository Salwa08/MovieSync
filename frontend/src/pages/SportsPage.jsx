import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Footer from "./LandingPage/Footer";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import MovieCard from "../pages/SearchPage/MovieCard";

function SportsPage() {
  const [sports, setSports] = useState([]);
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    axios
      .get("http://localhost:8000/videos/films/")
      .then((response) => {
       
        const sportsFilms = response.data.filter((film) =>
          Array.isArray(film.Genre)
            ? film.Genre.some((g) => g.toLowerCase() === "sports")
            : String(film.Genre).toLowerCase().includes("sports")
        );
        setSports(sportsFilms);
      })
      .catch((error) => {
        console.error("Failed to fetch sports content:", error.message);
      });
  }, [isAuthenticated, navigate]);

  const handleSportsClick = (item) => {
    navigate(`/sports/${item.id}`, { state: { movie: item } });
  };

  return (
    <div className="text-white bg-black min-h-screen">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Sports</h1>
        {sports.length === 0 ? (
          <div className="text-gray-400 text-lg text-center py-16">
            No sports content found.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {sports.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSportsClick(item)}
                className="cursor-pointer md:hover:scale-105 transition-transform"
              >
                <MovieCard movie={item} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SportsPage;
