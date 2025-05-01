"use client";
import React from "react";

const InputField = ({ placeholder, name, value, onChange, type}) => {
    const inputType = type || (placeholder.toLowerCase().includes("password") ? "password" : "text");

  return (
    <div className="relative w-full max-w-sm mb-1">
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-12 rounded-md bg-gray-200/80 px-4 py-3 text-gray-800 focus:outline-none"
        placeholder=""
        aria-label={placeholder}
      />
      <span className="absolute left-4 top-8 transform -translate-y-1/2 text-gray-500 font-medium text-sm pointer-events-none">
        {value ? "" : placeholder}
      </span>
    </div>
  );
};

export default InputField;
