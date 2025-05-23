import React from "react";

const NavLinks = () => {
  const links = ["Movies", "Series", "Documentary", "Sports", "Kids"];

  return (
    <nav className="hidden md:flex gap-12 ">
      {links.map((link, index) => (
        <a
          key={index}
          href={`#${link.toLowerCase()}`}
          className="text-xl font-extralight text-white  max-md:text-lg hover:text-red-800 transition-colors visited:text-red-800"
        >
          {link}
        </a>
      ))}
    </nav>
  );
};

export default NavLinks;