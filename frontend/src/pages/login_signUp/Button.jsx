"use client";
import React from "react";

const Button = ({ children, type = "button", onClick, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full w-full max-w-xs transition duration-200 ease-in-out ${className}`}
    >

        {children}
     
    </button>
  );
};

export default Button;
