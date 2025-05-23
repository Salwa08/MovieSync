import React from "react";

const Button = ({ children, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-8 py-2  bg-red-600 text-white rounded hover:bg-red-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
