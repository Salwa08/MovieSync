import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Footer from "./LandingPage/Footer";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import MovieCard from "../pages/SearchPage/MovieCard";
import { FaHeart } from "react-icons/fa";

function DocumentaryPage() {
  const [documentaries, setDocumentaries] = useState([]);
  const [popularDocs, setPopularDocs] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);
  const [hearted, setHearted] = useState({}); // Track hearted state per doc
  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    axios
      .get("http://localhost:8000/videos/films/")
      .then((response) => {
        // Filter for documentaries by genre
        const allDocs = response.data.filter((film) =>
          Array.isArray(film.Genre)
            ? film.Genre.map((g) => g.toLowerCase()).includes("documentary")
            : String(film.Genre).toLowerCase().includes("documentary")
        );
        setDocumentaries(allDocs);
        setPopularDocs(allDocs.filter((doc) => doc.is_popular === true));
        setNewReleases(
          allDocs.filter((doc) => doc.category === "new_releases")
        );
        setTrendingNow(
          allDocs.filter((doc) => doc.category === "trending_now")
        );
      })
      .catch((error) => {
        console.error("Failed to fetch documentaries:", error.message);
      });
  }, [isAuthenticated, navigate]);

  const handleDocClick = (doc) => {
    navigate(`/documentary/${doc.id}`, { state: { movie: doc } });
  };

  // Heart logic (copy from MovieCard)
  const handleHeartClick = async (e, doc) => {
    e.stopPropagation();
    if (!user || !user.token) return;
    const isHearted = hearted[doc.id];
    if (!isHearted) {
      const res = await fetch("http://localhost:8000/videos/favourites/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ film: doc.id }),
      });
      if (res.ok) setHearted((prev) => ({ ...prev, [doc.id]: true }));
      else alert("Failed to add favourite");
    } else {
      const res = await fetch(
        `http://localhost:8000/videos/favourites/remove/${doc.id}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (res.ok) setHearted((prev) => ({ ...prev, [doc.id]: false }));
      else alert("Failed to remove favourite");
    }
  };

  return (
    <div className="text-white bg-black min-h-screen">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <Navbar />
      <div className="flex flex-col">
        {/* HERO SECTION */}
        {documentaries[0] && (
          <div className="mt-[80px] md:mt-[120px] p-5 rounded-xl overflow-hidden m-5 bg-gray-900">
            <h2 className="text-3xl font-bold mb-4">Featured Documentary</h2>
            <div className="flex gap-8 items-center">
              <div
                className="flex-none w-40 md:w-56 aspect-[2/3] rounded-lg cursor-pointer md:hover:scale-105 transition-transform relative"
                onClick={() => handleDocClick(documentaries[0])}
              >
                <img
                  src={documentaries[0].Poster}
                  alt={documentaries[0].Titre}
                  className="w-full h-full object-cover rounded-lg"
                />
                {/* Heart button overlay */}
                <button
                  className={`absolute top-2 right-2 rounded-full p-2 transition-opacity bg-neutral-800/80 ${
                    hearted[documentaries[0].id] ? "bg-red-600" : ""
                  }`}
                  onClick={(e) => handleHeartClick(e, documentaries[0])}
                  aria-label={
                    hearted[documentaries[0].id]
                      ? "Remove from favourites"
                      : "Add to favourites"
                  }
                >
                  <FaHeart
                    className={`h-5 w-5 transition-colors ${
                      hearted[documentaries[0].id]
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">
                  {documentaries[0].Titre}
                </h3>
                <div className="text-gray-400 text-sm mb-2">
                  {Array.isArray(documentaries[0].Genre)
                    ? documentaries[0].Genre.join(", ")
                    : documentaries[0].Genre}
                </div>
                <div className="text-gray-300 mb-2">
                  {documentaries[0].Description || documentaries[0].description}
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block w-fit"
                  onClick={() => handleDocClick(documentaries[0])}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
        {/* POPULAR DOCUMENTARIES */}
        {popularDocs.length > 0 && (
          <div className="mt-4 p-5 rounded-xl overflow-hidden m-5">
            <h2 className="text-2xl font-bold mb-4">Popular Documentaries</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 p-4">
              {popularDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleDocClick(doc)}
                  className="cursor-pointer md:hover:scale-105 transition-transform"
                >
                  <MovieCard movie={doc} />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* NEW RELEASES */}
        {newReleases.length > 0 && (
          <div className="mt-4 p-5 rounded-xl overflow-hidden m-5">
            <h2 className="text-2xl font-bold mb-4">New Releases</h2>
            <div className="flex h-72 gap-8 overflow-x-auto hide-scrollbar p-4">
              {newReleases.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleDocClick(doc)}
                  className="flex-none w-44 aspect-[2/3] rounded-lg cursor-pointer md:hover:scale-105 transition-transform"
                >
                  <MovieCard movie={doc} />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* TRENDING NOW */}
        {trendingNow.length > 0 && (
          <div className="mt-4 p-5 rounded-xl overflow-hidden m-5">
            <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
            <div className="flex h-72 gap-8 overflow-x-auto hide-scrollbar p-4">
              {trendingNow.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleDocClick(doc)}
                  className="flex-none w-44 aspect-[2/3] rounded-lg cursor-pointer md:hover:scale-105 transition-transform"
                >
                  <MovieCard movie={doc} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DocumentaryPage;
