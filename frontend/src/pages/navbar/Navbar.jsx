import React from "react";
import Logo from "../login_signUp/Logo";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";
import BurgerMenu from "./BurgerMenu";

const Navbar = () => {
  const links = ["Movies", "Series", "Documentary", "Sports", "Kids"];

  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-14 py-6 mx-auto max-w-none max-md:px-8 max-md:py-5 w-full z-50">
      <Logo />
      <NavLinks />
      <NavIcons />
      <BurgerMenu links={links} />
    </nav>
  );
};

export default Navbar;