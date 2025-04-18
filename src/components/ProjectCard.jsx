import React, { useState } from "react";
import {
  deleteProjectById,
  editProjectById,
} from "../services/ProjectServices";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ProjectState } from "../data/atom";

const ProjectCard = ({ project, onDelete, handleEditTrigger }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProjectData, setEditedProjectData] = useState({ ...project });

  const [currentProject, setCurrentProject] = useRecoilState(ProjectState);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await deleteProjectById(project.project_id);
      onDelete(project.project_id);
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project!");
    }
  };

  const handleEdit = async () => {
    try {
      // Call the editProjectById function with the edited data
      const updatedProject = await editProjectById(project.project_id, {
        name: editedProjectData.name,
        description: editedProjectData.description,
        start_date: editedProjectData.start_date,
        end_date: editedProjectData.end_date,
        status: editedProjectData.status,
        priority: editedProjectData.priority,
        created: project.created, // Assume "created" remains unchanged, hence it is passed as is
      });
      setCurrentProject(project.project_id);
      console.log("Project updated successfully:", updatedProject);
      setIsEditing(false); // Close the edit mode after successful update
      // location.reload();
      handleEditTrigger();
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error updating project!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="max-w-sm rounded-lg bg-white overflow-hidden relative shadow-lg">
        {/* Menu Icon */}
        <div className="absolute top-3 right-3">
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer"
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
          {isDropdownOpen && !isEditing && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md">
              <ul>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
                    onClick={() => setIsEditing(true)} // Enter edit mode
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

        {/* Display Card Content */}
        {!isEditing && (
          <>
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
              <p className="text-sm text-gray-600">DeadLine</p>
              <p>{formatDate(project.end_date)}</p>
            </div>
            <div className="px-6 py-2 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Remaining Time</span>
                <span className="flex gap-1">
                  <p>{calculateRemainingTime(project.end_date).days} day</p>
                  <p>{calculateRemainingTime(project.end_date).hours} hrs</p>
                  <p>{calculateRemainingTime(project.end_date).minutes} min</p>
                </span>
              </div>
              <Link
                to="/tasks"
                className="bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                <button
                  onClick={() => {
                    setCurrentProject(project.project_id);
                  }}
                >
                  Open
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Edit Modal Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Project</h2>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold">
                Project Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedProjectData.name}
                onChange={handleInputChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-semibold"
              >
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={editedProjectData.description}
                onChange={handleInputChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="start_date"
                className="block text-sm font-semibold"
              >
                Start Date
              </label>
              <input
                type="datetime-local"
                id="start_date"
                name="start_date"
                value={editedProjectData.start_date.slice(0, 16)} // Format to "YYYY-MM-DDTHH:MM"
                onChange={handleInputChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="end_date" className="block text-sm font-semibold">
                End Date
              </label>
              <input
                type="datetime-local"
                id="end_date"
                name="end_date"
                value={editedProjectData.end_date.slice(0, 16)} // Format to "YYYY-MM-DDTHH:MM"
                onChange={handleInputChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-semibold">
                Project Status
              </label>
              <select
                id="status"
                name="status"
                value={editedProjectData.status}
                onChange={handleInputChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              >
                <option value="active">Active</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="priority" className="block text-sm font-semibold">
                Project Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={editedProjectData.priority}
                onChange={handleInputChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setIsEditing(false)} // Close edit mode
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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

  return {
    days: diffInDays,
    hours: remainingHours,
    minutes: remainingMinutes,
    message: "Time remaining",
  };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Formats to "DD/MM/YYYY"
};
