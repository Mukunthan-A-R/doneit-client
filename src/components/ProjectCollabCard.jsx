import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { CurrentProject, ProjectState } from "../data/atom";
import {
  deleteProjectById,
  editProjectById,
  fetchProjectById,
} from "../services/ProjectServices";
import { formatDate } from "../services/utils";
import useClickOutside from "../hooks/useClickOutside";

const ProjectCollabCard = ({ project, onDelete, handleEditTrigger }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProjectData, setEditedProjectData] = useState({ ...project });

  const setCurrentProject = useSetRecoilState(ProjectState);
  const setCurrentProjectData = useSetRecoilState(CurrentProject);

  const handleClickOutsideRef = useClickOutside(() => setIsDropdownOpen(false));

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
      const projectOwner = await fetchProjectById(project.project_id);
      try {
        // Call the editProjectById function with the edited data
        const updatedProject = await editProjectById(project.project_id, {
          name: editedProjectData.name,
          description: editedProjectData.description,
          start_date: editedProjectData.start_date,
          end_date: editedProjectData.end_date,
          status: editedProjectData.status,
          priority: editedProjectData.priority,
          created: projectOwner.data.created, // Assume "created" remains unchanged, hence it is passed as is
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
    } catch (err) {
      console.log("Error Update", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const remainingTime = calculateRemainingTime(project.end_date);

  const handleNavigate = () => {
    setCurrentProject(project.project_id);
    setCurrentProjectData(project);
    navigate(`/tasks/${project.project_id}`);
  };

  const truncate = (str, max = 20) =>
    str.length > max ? str.slice(0, max) + "..." : str;

  // console.log("project.role");
  // console.log(project.role);

  return (
    <>
      <div className="max-w-sm p-3 pb-2 gap-2 flex flex-col rounded-lg bg-white overflow-hidden relative shadow-md border border-gray-200 hover:shadow-xl hover:scale-101 transition">
        {/* Menu Icon */}
        <div className="absolute top-1 right-1">
          {project.role === "admin" && (
            <button
              className="text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 grid place-items-center text-[10px] font-bold p-1 size-8"
              onClick={toggleDropdown}
              ref={handleClickOutsideRef}
            >
              •••
            </button>
          )}

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
            <div className="flex items-center space-x-3">
              {project.status === "active" ? (
                <div className="size-4 rounded-full bg-green-600"></div>
              ) : project.status === "completed" ? (
                <div className="size-4 rounded-full bg-gray-800"></div>
              ) : (
                <div className="size-4 rounded-full bg-red-600"></div>
              )}
              <h2
                className="text-xl font-semibold text-blue-800 truncate w-[160px]"
                title={project.name}
              >
                {truncate(project.name, 20)}
              </h2>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mr-5 ${
                  project.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : project.priority === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : project.priority === "low"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {project.priority?.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{project.description}</p>

            <span className="flex">
              <p className="text-gray-600">Your Role: </p>
              <p>{project.role}</p>
            </span>
            <div>
              <p className="text-sm text-gray-600">DeadLine</p>
              <p>{formatDate(project.end_date)}</p>
            </div>

            <div className="flex items-center justify-between">
              {editedProjectData.status !== "completed" ? (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">Remaining Time</span>

                  {remainingTime.overDue === 0 ? (
                    <span className="flex gap-1">
                      <p>{remainingTime.days} day</p>
                      <p>{remainingTime.hours} hrs</p>
                      <p>{remainingTime.minutes} min</p>
                    </span>
                  ) : (
                    <span className="text-red-600">Task Overdue</span>
                  )}
                </div>
              ) : (
                <>
                  <span className="text-sm text-green-600">
                    Project Completed
                  </span>
                  <div className="absolute bottom-18 right-[-1rem] rotate-[-20deg] text-green-600 border-2 border-green-600 px-3 py-1 font-bold text-sm uppercase opacity-80 pointer-events-none">
                    Completed
                  </div>
                </>
              )}
              <button
                className="bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                onClick={handleNavigate}
              >
                Open
              </button>
            </div>
          </>
        )}
      </div>

      {/* Edit Modal Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 pt-6 rounded-lg shadow-lg w-96">
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
                <option value="">Select</option>
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

export default ProjectCollabCard;

const calculateRemainingTime = (endDate) => {
  const currentDate = new Date();
  const end = new Date(endDate);
  const diffInMilliseconds = end - currentDate;
  if (diffInMilliseconds <= 0) {
    return { message: "The project has ended", overDue: 1 };
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
    overDue: 0,
  };
};
