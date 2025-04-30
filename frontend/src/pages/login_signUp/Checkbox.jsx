"use client";
import React from "react";

const Checkbox = ({ label, htmlFor, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={htmlFor}
        className="border border-red-600 border-solid bg-zinc-300 bg-opacity-0 h-[15px] w-[15px]"
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={htmlFor}
        className="pl-5 ml-2 text-base font-medium text-white"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
