"use client";
import React from "react";

const Checkbox = ({ label, htmlFor, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center h-5 mt-0.5">
      <input
        type="checkbox"
        id={htmlFor}
        className="border-2 border-red-600 accent-red-600 h-4 w-4"
        checked={checked}
        onChange={onChange}
        
      />
      </div>
      <label
        htmlFor={htmlFor}
        className="ml-2 text-sm text-white"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
