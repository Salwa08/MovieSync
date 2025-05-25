import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/home/" },
  { name: "Movies", path: "/films" },
  { name: "Series", path: "/series" },
  { name: "Documentary", path: "/documentary" },
  { name: "Sports", path: "/sports" },
  { name: "Kids", path: "/kids" },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="bg-gray-900 px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold text-red-600 tracking-wider">
          MovieSync
        </span>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-lg font-semibold transition-colors duration-200 px-2 py-1 rounded hover:text-red-500 hover:bg-gray-800 ${
                location.pathname.startsWith(item.path)
                  ? "text-red-500 bg-gray-800"
                  : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Add user/profile dropdown or search here if needed */}
    </nav>
  );
};

export default Navbar;
