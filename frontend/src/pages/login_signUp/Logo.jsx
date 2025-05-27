"use client";
import React from "react";
import logo from "../../components/LOGO.png";


const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center min-w-[60px] ${className}`}>
      <div className="w-2 sm:w-4 md:w-6" />
      <img src={logo} alt="MovieSync Logo" className="h-10 w-auto" />
    </div>
  );
};

export default Logo;
