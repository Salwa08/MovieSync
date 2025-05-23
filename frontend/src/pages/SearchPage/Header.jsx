import React from "react";
import Logo from "../../components/LOGO.png";
import { FaSearch, FaUserCircle, FaFilter } from "react-icons/fa";

function Header({ onFilterClick, onSearch, searchValue, setSearchValue }) {
  return (
    <header className="w-full flex items-center px-6 py-4 bg-[#280101] gap-4 shadow-md sticky top-0 z-40">
      <img src={Logo} alt="MovieSync Logo" className="h-10 w-auto" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch && onSearch();
        }}
        className="flex-1 flex items-center mx-6 bg-[#3a1818] rounded-full px-4 py-2"
      >
        <input
          type="text"
          placeholder="What do you want to watch?"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder:text-neutral-400 px-2"
        />
        <button type="submit" className="text-white hover:text-red-400">
          <FaSearch size={20} />
        </button>
      </form>
      <button
        onClick={onFilterClick}
        className="text-white hover:text-red-400 p-2 rounded-full bg-[#3a1818] mr-2"
        aria-label="Open filters"
      >
        <FaFilter size={22} />
      </button>
      <button className="text-white hover:text-red-400 p-2 rounded-full bg-[#3a1818]">
        <FaUserCircle size={28} />
      </button>
    </header>
  );
}

export default Header;
