import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Footer from "./LandingPage/Footer";
import { useUser } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { MdTv } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faStar,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

const scrollbarHideStyles = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

function SeriesPage() {
  const [allSeries, setAllSeries] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [dramaSeries, setDramaSeries] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);

  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleSeriesClick = (serie) => {
    navigate(`/series/${serie.id}`, { state: { serie } });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    axios
      .get("http://localhost:8000/videos/series/")
      .then((response) => {
        // Handle paginated response from Django REST Framework
        console.log("Series API response:", response.data);
        let seriesList = [];

        if (response.data && response.data.results) {
          // Handle paginated response
          seriesList = response.data.results;
        } else if (Array.isArray(response.data)) {
          // Handle array response
          seriesList = response.data;
        } else {
          // Handle other formats
          seriesList = response.data.series || [];
        }
        setAllSeries(seriesList);

        // Categorize series by their properties
        const popular = seriesList.filter(
          (serie) => serie.category === "popular"
        );
        const drama = seriesList.filter(
          (serie) =>
            serie.Genre?.some((genre) =>
              genre.toLowerCase().includes("drama")
            ) || serie.category === "drama"
        );
        const newest = seriesList.filter(
          (serie) => serie.category === "new_releases"
        );
        const trending = seriesList.filter(
          (serie) => serie.category === "trending_now"
        );

        setPopularSeries(popular.length ? popular : seriesList.slice(0, 10));
        setDramaSeries(drama.length ? drama : seriesList.slice(10, 20));
        setNewReleases(newest.length ? newest : seriesList.slice(20, 30));
        setTrendingNow(trending.length ? trending : seriesList.slice(30, 40));
      })
      .catch((error) => {
        console.error("Failed to fetch series:", error.message);
      });
  }, [isAuthenticated, navigate]);

  return (
    <div className="text-white bg-black min-h-screen">
      <style>{scrollbarHideStyles}</style>
      <Navbar />
      <div className="flex flex-col">
        {/* SECTION POPULAR SERIES */}
        <div className="mt-[80px] md:mt-[120px] p-5 rounded-xl overflow-hidden m-5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              <MdTv className="inline mr-3" />
              Popular Series
            </h2>
            <Link
              to="/series/popular"
              className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block"
            >
              See more
            </Link>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex h-72 gap-8 overflow-x-auto hide-scrollbar p-4">
              {popularSeries.map((serie) => (
                <div
                  key={serie.id}
                  onClick={() => handleSeriesClick(serie)}
                  className="flex-none w-44 aspect-[2/3] rounded-lg transition-transform duration-300 cursor-pointer md:hover:scale-105"
                >
                  <img
                    src={serie.Poster}
                    alt={serie.Titre}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>{" "}
        {/* SECTION DRAMA */}
        <div className="mt-4 p-5 rounded-xl overflow-hidden m-5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              <FontAwesomeIcon
                icon={faWandMagicSparkles}
                className="inline mr-3"
              />
              Drama Series
            </h2>
            <Link
              to="/series/drama"
              className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block"
            >
              See more
            </Link>
          </div>
          <div className="relative overflow-hidden">
            {" "}
            <div className="flex h-72 gap-8 overflow-x-auto hide-scrollbar p-4">
              {dramaSeries.map((serie) => (
                <div
                  key={serie.id}
                  onClick={() => handleSeriesClick(serie)}
                  className="flex-none w-44 aspect-[2/3] rounded-lg transition-transform duration-300 cursor-pointer md:hover:scale-105"
                >
                  <img
                    src={serie.Poster}
                    alt={serie.Titre}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* SECTION NEW RELEASES */}
        <div className="mt-4 p-5 rounded-xl overflow-hidden m-5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              <FontAwesomeIcon icon={faStar} className="inline mr-3" />
              New Releases
            </h2>
            <Link
              to="/series/new-releases"
              className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block"
            >
              See more
            </Link>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex h-72 gap-8 overflow-x-auto hide-scrollbar p-4">
              {newReleases.map((serie) => (
                <div
                  key={serie.id}
                  onClick={() => handleSeriesClick(serie)}
                  className="flex-none w-44 aspect-[2/3] rounded-lg transition-transform duration-300 cursor-pointer md:hover:scale-105"
                >
                  <img
                    src={serie.Poster}
                    alt={serie.Titre}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* SECTION TRENDING NOW */}
        <div className="mt-4 p-5 rounded-xl overflow-hidden m-5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              <FontAwesomeIcon icon={faBolt} className="inline mr-3" />
              Trending Now
            </h2>
            <Link
              to="/series/trending"
              className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block"
            >
              See more
            </Link>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex h-72 gap-8 overflow-x-auto hide-scrollbar p-4">
              {trendingNow.map((serie) => (
                <div
                  key={serie.id}
                  onClick={() => handleSeriesClick(serie)}
                  className="flex-none w-44 aspect-[2/3] rounded-lg transition-transform duration-300 cursor-pointer md:hover:scale-105"
                >
                  <img
                    src={serie.Poster}
                    alt={serie.Titre}
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

export default SeriesPage;
