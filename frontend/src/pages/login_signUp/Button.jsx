"use client";
import React from "react";

const Button = ({ children, className = "" }) => {
  return (
    <button
      className={`relative flex justify-center items-center h-[51px] w-[185px] max-sm:w-full ${className}`}
    >
      <div className="absolute bg-red-600 h-[51px] rounded-[40px] w-[185px] max-sm:w-full"></div>
      <span className="relative text-base font-bold text-center text-white uppercase">
        {children}
      </span>
    </button>
  );
};

export default Button;
