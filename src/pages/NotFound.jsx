import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you’re looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <button
        onClick={() => navigate("/")}
        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
        aria-label="Go back home"
      >
        Go Back Home
      </button>

      <svg
        className="w-64 h-64 mt-16 text-red-600 opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        stroke="currentColor"
      >
        <circle cx="32" cy="32" r="30" strokeWidth="4" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M20 20l24 24M44 20L20 44"
        />
      </svg>
    </div>
  );
};

export default NotFound;
