import React, { useState } from "react";
import { deleteProjectById } from "../services/ProjectServices";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const diff = calculateRemainingTime(project.end_date);

  const handleDelete = async () => {
    try {
      await deleteProjectById(project.project_id); // Call the delete function from the service
      onDelete(project.project_id); // Notify the parent component to remove the project
      alert("Project deleted successfully!"); // Optionally show success message
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project!"); // Optionally show error message
    }
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
                  onClick={handleDelete}
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="px-6 py-4">
        <div className="flex items-center space-x-3">
          {project.status === "active" ? (
            <div className="w-4 h-4 rounded-full bg-green-600"></div>
          ) : project.status === "completed" ? (
            <div className="w-4 h-4 rounded-full bg-gray-800"></div>
          ) : (
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
          )}

          <h2 className="text-xl font-semibold text-blue-800">
            {project.name}
          </h2>
        </div>
        <p className="text-gray-600 mt-2">{project.description}</p>
      </div>
      <div className="pl-6">
        <p className="text-sm text-gray-600 ">DeadLine</p>
        <p>{formatDate(project.end_date)}</p>
      </div>
      <div className="px-6 py-2 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Remaining Time</span>
          <span className="flex gap-1">
            <p> {diff.days} day</p>
            <p> {diff.hours} hrs</p>
            <p>{diff.minutes} min</p>
          </span>
        </div>
        <Link
          to="/tasks"
          className="bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Open
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;

const calculateRemainingTime = (endDate) => {
  const currentDate = new Date();

  const end = new Date(endDate);

  const diffInMilliseconds = end - currentDate;
  if (diffInMilliseconds <= 0) {
    return { message: "The project has ended" };
  }

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const remainingHours = diffInHours % 24;
  const remainingMinutes = diffInMinutes % 60;
  const remainingSeconds = diffInSeconds % 60;

  return {
    days: diffInDays,
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
    message: "Time remaining",
  };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Formats to "DD/MM/YYYY"
};
