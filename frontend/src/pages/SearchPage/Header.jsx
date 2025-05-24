import React from "react";
import Logo from "../login_signUp/Logo";
import { FaSearch, FaFilter } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Header({
  onFilterClick,
  onSearch,
  searchValue,
  setSearchValue,
  clearSearch,
}) {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-black py-6 border-b border-gray-800">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <a href="/" className="flex items-center">
          <Logo />
        </a>
        <div className="flex-1 max-w-2xl mx-8 py-2">
          <div className="relative">
            <input
              type="text"
              placeholder="What do you want to watch?"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && onSearch) onSearch();
              }}
              className="w-full bg-transparent border-2 border-white/70 rounded-md py-3 pl-4 pr-12 text-white placeholder-white/70 focus:outline-none focus:border-red-600 transition-colors"
            />
            <button
              type="button"
              onClick={onSearch}
              className="absolute right-3 top-2/3 transform -translate-y-1/2 text-white/70 hover:text-white"
              aria-label="Search"
            >
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={onFilterClick}
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Filter"
          >
            <FaFilter className="h-6 w-6" />
          </button>
          <button
            onClick={() => {
              setSearchValue("");
              if (clearSearch) clearSearch();
              navigate("/home");
            }}
            className="text-white hover:text-red-400 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            className="p-4 text-white rounded-full"
            aria-label="Profile"
            onClick={() => navigate("/profile")}
          >
            <BsFillPersonFill className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
