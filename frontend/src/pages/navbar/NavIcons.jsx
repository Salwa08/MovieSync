import React from "react";
import { CiSearch } from "react-icons/ci";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const NavIcons = () => {
  const navigate = useNavigate();
  return (
    <div className="hidden lg:flex gap-5 mt-2.5">
      <button
        className="focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2"
        onClick={() => navigate("/search")}
      >
        <CiSearch className="text-white w-6 h-6" />
      </button>
      <button
        className="focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2"
        onClick={() => navigate("/profile")}
      >
        <BsFillPersonFill className="text-white w-6 h-6" />
      </button>
    </div>
  );
};

export default NavIcons;
