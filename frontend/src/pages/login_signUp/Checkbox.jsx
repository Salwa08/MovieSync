import React from "react";

const Checkbox = ({ label, htmlFor, checked, onChange }) => {
  return (
    <div className="flex items-start gap-2 text-sm w-full">
      <input
        type="checkbox"
        id={htmlFor}
        className="mt-1 accent-red-600 h-4 w-4"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={htmlFor} className="text-white">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
