import React, { useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import Footer from "../LandingPage/Footer";
import MovieCard from "./MovieCard";
import SearchResults from "./SearchResults";
import { Link } from "react-router-dom";

function Button({ children, variant, className = "", ...props }) {
  const base =
    variant === "outline"
      ? "border px-4 py-2 rounded text-white bg-transparent "
      : "px-4 py-2 rounded text-white ";
  return (
    <button className={base + className} {...props}>
      {children}
    </button>
  );
}

function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Handler to be passed to Filter for searching
  const handleSearch = async (params) => {
    setLoading(true);
    setHasSearched(true);
    // Always include query param (even if empty)
    const rawParams = { query: searchValue, ...(params || {}) };
    const filteredParams = {};
    Object.entries(rawParams).forEach(([key, value]) => {
      if (
        value !== "" &&
        value !== 0 &&
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        filteredParams[key] = value;
      }
    });
    try {
      const response = await fetch(
        `http://localhost:8000/videos/search/?${new URLSearchParams(
          filteredParams
        )}`
      );
      const data = await response.json();
      setResults([...(data.films || []), ...(data.series || [])]);
    } catch (err) {
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  const handleFilterApply = (params) => {
    setShowFilter(false);
    handleSearch(params);
  };

  const handleFilterReset = () => {
    setShowFilter(false);
    setSearchValue("");
    setResults([]);
    setHasSearched(false);
  };

  const clearSearch = () => {
    setSearchValue("");
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header
        onFilterClick={() => setShowFilter(true)}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        clearSearch={clearSearch}
        onSearch={() => handleSearch()} // <-- Pass search handler
      />
      {showFilter && (
        <div className="fixed top-20 right-[270px] z-50">
          <div className="relative">
            <Filter
              onApply={handleFilterApply}
              onReset={handleFilterReset}
              loading={loading}
            />
            <button
              className="absolute top-2 right-2 text-black text-2xl font-bold bg-white/80 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-200"
              onClick={() => setShowFilter(false)}
              aria-label="Close filter"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <SearchResults
        isLoading={loading}
        hasSearched={hasSearched}
        movies={results}
        clearSearch={clearSearch}
        Button={Button}
        Link={Link}
        MovieCard={MovieCard}
      />
      <Footer />
    </div>
  );
}

export default SearchPage;
