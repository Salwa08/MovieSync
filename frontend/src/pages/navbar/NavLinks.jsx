import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Movies", path: "/films" },
  { name: "Series", path: "/series" },
  { name: "Documentary", path: "/documentary" },
  { name: "Sports", path: "/sports" },
  { name: "Kids", path: "/kids" },
];

const NavLinks = () => {
  const location = useLocation();
  return (
    <nav className="hidden md:flex gap-12 ">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          className={`text-xl font-extralight max-md:text-lg transition-colors ${
            location.pathname === link.path
              ? "text-red-800"
              : "text-white hover:text-red-800"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
