import React, { useState } from "react";

const ProjectCard = ({ project }) => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="max-w-sm rounded-lg bg-white overflow-hidden relative shadow-lg">
      {/* Menu Icon */}
      <div className="absolute top-3 right-3">
        <button
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={toggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 12h12M6 6h12m-6 12h6"
            ></path>
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md">
            <ul>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-red-600 hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="px-6 py-4">
        {/* Circle Before Title */}
        <div className="flex items-center space-x-3">
          {project.status === "active" ? (
            <div className="w-4 h-4 rounded-full bg-green-600"></div>
          ) : project.status === "completed" ? (
            <div className="w-4 h-4 rounded-full bg-gray-800"></div>
          ) : (
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
          )}

          {/* Smaller Circle */}
          <h2 className="text-xl font-semibold text-blue-800">
            {project.name}
          </h2>
        </div>
        <p className="text-gray-600 mt-2">{project.description}</p>
      </div>

      <div className="px-6 py-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">Last updated 2 days ago</span>
        <a
          href="#"
          className="bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Open
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
