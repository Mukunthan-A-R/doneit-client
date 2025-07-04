import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  id,
  label,
  value,
  onChange,
  required = true,
  minLength = 6,
  placeholder = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex justify-between items-center w-full px-3 py-2 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className="outline-none flex-grow"
          value={value}
          onChange={onChange}
          required={required}
          minLength={minLength}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="ml-2 text-gray-600 hover:text-gray-800"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {!showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
