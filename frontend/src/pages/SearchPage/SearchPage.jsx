import React, { useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import Footer from "../LandingPage/Footer";
import MovieCard from "./MovieCard";

function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handler to be passed to Filter for searching
  const handleSearch = async (params) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:8000/videos/search_content/?${new URLSearchParams(
          params
        )}`
      );
      const data = await response.json();
      setResults([...(data.films || []), ...(data.series || [])]);
    } catch (err) {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Movies & Series</h1>
        <Filter onSearch={handleSearch} loading={loading} />
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {results.map((item) => (
            <MovieCard key={item.id} movie={item} onClick={() => {}} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SearchPage;
