"use client";
import React from "react";
import logo from "../../components/LOGO.png";

// A reusable Logo component with consistent left spacing
const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center min-w-[60px] ${className}`}>
      {/* Spacer for consistent left margin, reduced for less space */}
      <div className="w-2 sm:w-4 md:w-6" />
      <img src={logo} alt="MovieSync Logo" className="h-10 w-auto" />
    </div>
  );
};

export default Logo;
