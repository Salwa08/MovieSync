"use client";
import React from "react";

const InputField = ({ placeholder, name, value, onChange, type }) => {
  const inputType =
    type || (placeholder.toLowerCase().includes("password") ? "password" : "text");

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="peer w-full h-12 rounded-md bg-gray-100/80 px-4 pt-5 pb-1 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
      />
      <label
        htmlFor={name}
        className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default InputField;

