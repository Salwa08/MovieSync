import React from "react";
import { CiSearch } from "react-icons/ci";
import { BsFillPersonFill } from "react-icons/bs";

const NavIcons = () => {
  return (
    <div className="hidden lg:flex gap-5 mt-2.5">
      <button className="focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2">
        <CiSearch className="text-white w-6 h-6" />
      </button>
      <button className="focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2">
        <BsFillPersonFill className="text-white w-6 h-6" />
      </button>
    </div>
  );
};

export default NavIcons;