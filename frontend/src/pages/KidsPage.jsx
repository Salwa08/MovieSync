import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Footer from "./LandingPage/Footer";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function KidsPage() {
  const [kids, setKids] = useState([]);
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    axios
      .get("http://localhost:8000/videos/films/")
      .then((response) => {
        // Filter for animation films by genre (case-insensitive)
        const animationKids = response.data.filter((film) =>
          Array.isArray(film.Genre)
            ? film.Genre.some((g) => g.toLowerCase().includes("animation"))
            : String(film.Genre).toLowerCase().includes("animation")
        );
        setKids(animationKids);
      })
      .catch((error) => {
        console.error("Failed to fetch kids content:", error.message);
      });
  }, [isAuthenticated, navigate]);

  
  const popularKids = kids.filter((k) => k.is_popular === true);
  const familyKids = kids.filter((k) =>
    Array.isArray(k.Genre)
      ? k.Genre.some((g) => g.toLowerCase().includes("family"))
      : String(k.Genre).toLowerCase().includes("family")
  );
  const sciFiKids = kids.filter((k) =>
    Array.isArray(k.Genre)
      ? k.Genre.some((g) => g.toLowerCase().includes("sci"))
      : String(k.Genre).toLowerCase().includes("sci")
  );
  const dramaKids = kids.filter((k) =>
    Array.isArray(k.Genre)
      ? k.Genre.some((g) => g.toLowerCase().includes("drama"))
      : String(k.Genre).toLowerCase().includes("drama")
  );

  
  const [hearted, setHearted] = useState({});
  const { user } = useUser();

  
  const handleHeartClick = async (e, doc) => {
    e.preventDefault(); // Prevent navigating to movie page
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
      const data = await res.json();
      console.log("Add favourite response:", res.status, data);
      if (res.ok) setHearted((prev) => ({ ...prev, [doc.id]: true }));
      else alert(data.error || "Failed to add favourite");
    } else {
      const res = await fetch(
        `http://localhost:8000/videos/favourites/remove/${doc.id}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await res.json();
      console.log("Remove favourite response:", res.status, data);
      if (res.ok) setHearted((prev) => ({ ...prev, [doc.id]: false }));
      else alert(data.error || "Failed to remove favourite");
    }
  };

  const handleKidsClick = (item) => {
    navigate(`/kids/${item.id}`, { state: { movie: item } });
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
        {kids[0] && (
          <div className="mt-[80px] md:mt-[120px] p-5 rounded-xl overflow-hidden m-5 bg-gray-900">
            <h2 className="text-3xl font-bold mb-4">Featured Animation</h2>
            <div className="flex gap-8 items-center">
              <div
                className="flex-none w-40 md:w-56 aspect-[2/3] rounded-lg cursor-pointer md:hover:scale-105 transition-transform"
                onClick={() => handleKidsClick(kids[0])}
              >
                <img
                  src={kids[0].Poster}
                  alt={kids[0].Titre}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">{kids[0].Titre}</h3>
                <div className="text-gray-400 text-sm mb-2">
                  {Array.isArray(kids[0].Genre)
                    ? kids[0].Genre.join(", ")
                    : kids[0].Genre}
                </div>
                <div className="text-gray-300 mb-2">
                  {kids[0].Description || kids[0].description}
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block w-fit"
                  onClick={() => handleKidsClick(kids[0])}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
        {/* POPULAR ANIMATION */}
        {popularKids.length > 0 && (
          <div className="mt-4 p-5 rounded-xl overflow-hidden m-5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Popular Animation</h2>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block">
                See more
              </button>
            </div>
            <div className="flex h-56 gap-6 overflow-x-auto hide-scrollbar p-2">
              {popularKids.slice(0, 12).map((item) => (
                <div
                  key={item.id}
                  className="relative flex-none w-32 md:w-36 aspect-[2/3] cursor-pointer group"
                >
                  <img
                    src={item.Poster}
                    alt={item.Titre}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ minHeight: 120, maxHeight: 210 }}
                    onClick={() => handleKidsClick(item)}
                  />
                  <button
                    type="button"
                    className={`absolute top-2 right-2 z-10 rounded-full p-2 transition-opacity bg-neutral-800/80 group-hover:opacity-100 ${
                      hearted[item.id] ? "bg-red-600" : ""
                    }`}
                    onClick={(e) => handleHeartClick(e, item)}
                    aria-label={
                      hearted[item.id]
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    tabIndex={0}
                    style={{ outline: "none", border: "none" }}
                  >
                    <FaHeart
                      className={`h-5 w-5 transition-colors ${
                        hearted[item.id] ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* FAMILY ANIMATION */}
        {familyKids.length > 0 && (
          <div className="mt-4 p-5 rounded-xl overflow-hidden m-5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Family Animation</h2>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block">
                See more
              </button>
            </div>
            <div className="flex h-56 gap-6 overflow-x-auto hide-scrollbar p-2">
              {familyKids.slice(0, 12).map((item) => (
                <div
                  key={item.id}
                  className="relative flex-none w-32 md:w-36 aspect-[2/3] cursor-pointer group"
                >
                  <img
                    src={item.Poster}
                    alt={item.Titre}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ minHeight: 120, maxHeight: 210 }}
                    onClick={() => handleKidsClick(item)}
                  />
                  <button
                    type="button"
                    className={`absolute top-2 right-2 z-10 rounded-full p-2 transition-opacity bg-neutral-800/80 group-hover:opacity-100 ${
                      hearted[item.id] ? "bg-red-600" : ""
                    }`}
                    onClick={(e) => handleHeartClick(e, item)}
                    aria-label={
                      hearted[item.id]
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    tabIndex={0}
                    style={{ outline: "none", border: "none" }}
                  >
                    <FaHeart
                      className={`h-5 w-5 transition-colors ${
                        hearted[item.id] ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* SCI-FI ANIMATION */}
        {sciFiKids.length > 0 && (
          <div className="mt-4 p-5 rounded-xl overflow-hidden m-5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Sci-Fi Animation</h2>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block">
                See more
              </button>
            </div>
            <div className="flex h-56 gap-6 overflow-x-auto hide-scrollbar p-2">
              {sciFiKids.slice(0, 12).map((item) => (
                <div
                  key={item.id}
                  className="relative flex-none w-32 md:w-36 aspect-[2/3] cursor-pointer group"
                >
                  <img
                    src={item.Poster}
                    alt={item.Titre}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ minHeight: 120, maxHeight: 210 }}
                    onClick={() => handleKidsClick(item)}
                  />
                  <button
                    type="button"
                    className={`absolute top-2 right-2 z-10 rounded-full p-2 transition-opacity bg-neutral-800/80 group-hover:opacity-100 ${
                      hearted[item.id] ? "bg-red-600" : ""
                    }`}
                    onClick={(e) => handleHeartClick(e, item)}
                    aria-label={
                      hearted[item.id]
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    tabIndex={0}
                    style={{ outline: "none", border: "none" }}
                  >
                    <FaHeart
                      className={`h-5 w-5 transition-colors ${
                        hearted[item.id] ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* DRAMA ANIMATION */}
        {dramaKids.length > 0 && (
          <div className="mt-4 p-5 rounded-xl overflow-hidden m-5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Drama Animation</h2>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full font-bold md:hover:bg-red-700 transition inline-block">
                See more
              </button>
            </div>
            <div className="flex h-56 gap-6 overflow-x-auto hide-scrollbar p-2">
              {dramaKids.slice(0, 12).map((item) => (
                <div
                  key={item.id}
                  className="relative flex-none w-32 md:w-36 aspect-[2/3] cursor-pointer group"
                >
                  <img
                    src={item.Poster}
                    alt={item.Titre}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ minHeight: 120, maxHeight: 210 }}
                    onClick={() => handleKidsClick(item)}
                  />
                  <button
                    type="button"
                    className={`absolute top-2 right-2 z-10 rounded-full p-2 transition-opacity bg-neutral-800/80 group-hover:opacity-100 ${
                      hearted[item.id] ? "bg-red-600" : ""
                    }`}
                    onClick={(e) => handleHeartClick(e, item)}
                    aria-label={
                      hearted[item.id]
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    tabIndex={0}
                    style={{ outline: "none", border: "none" }}
                  >
                    <FaHeart
                      className={`h-5 w-5 transition-colors ${
                        hearted[item.id] ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* NO CONTENT MESSAGE */}
        {kids.length === 0 && (
          <div className="text-gray-400 text-lg text-center py-16">
            No kids content found.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default KidsPage;
