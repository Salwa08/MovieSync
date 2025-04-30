"use client";
import React from "react";

const InputField = ({ placeholder, name, value, onChange }) => {
  return (
    <div className="relative w-[360px] h-[50px] max-sm:w-full">
      <input
        type={
          placeholder.toLowerCase().includes("password") ? "password" : "text"
        }
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-full rounded-lg bg-[#D9D9D9] bg-opacity-66 px-6 py-3 text-gray-800 font-semibold focus:outline-none"
        placeholder=""
        aria-label={placeholder}
      />
      <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-sm font-['Montserrat']">
        {placeholder}
      </span>
    </div>
  );
};

export default InputField;
