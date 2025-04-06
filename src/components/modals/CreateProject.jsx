import React, { useState } from "react";
import { createProject } from "../../services/ProjectServices";

const CreateProject = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  // State to store form data and validation errors
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
    priority: "",
    // have to change create data
    created: 1,
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // Name and Description validation (min 5 characters, max 50 characters)
    if (
      !projectData.name ||
      projectData.name.length < 5 ||
      projectData.name.length > 50
    ) {
      newErrors.name = "Project name must be between 5 and 50 characters.";
    }

    if (
      !projectData.description ||
      projectData.description.length < 5 ||
      projectData.description.length > 50
    ) {
      newErrors.description =
        "Project description must be between 5 and 50 characters.";
    }

    // Start Date and End Date validation (must be filled)
    if (!projectData.start_date) {
      newErrors.start_date = "Start date is required.";
    }
    if (!projectData.end_date) {
      newErrors.end_date = "End date is required.";
    }

    // End Date cannot be before Start Date
    if (projectData.start_date && projectData.end_date) {
      const startDate = new Date(projectData.start_date);
      const endDate = new Date(projectData.end_date);
      if (endDate < startDate) {
        newErrors.end_date = "End date cannot be before start date.";
      }
    }

    // Status and Priority validation (must be filled)
    if (!projectData.status) {
      newErrors.status = "Project status is required.";
    }
    if (!projectData.priority) {
      newErrors.priority = "Project priority is required.";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Show errors
      return;
    }

    try {
      const response = await createProject(projectData);

      if (response) {
        console.log("Project created:", response);
        setShowModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full z-60">
        <h2 className="text-xl font-bold mb-4">Create Project</h2>
        <form onSubmit={handleSubmit}>
          {/* Project Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={projectData.name}
              onChange={handleChange}
              className={`mt-2 p-2 border border-gray-300 rounded w-full ${
                errors.name ? "border-red-500" : ""
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Project Description */}
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
              value={projectData.description}
              onChange={handleChange}
              className={`mt-2 p-2 border border-gray-300 rounded w-full ${
                errors.description ? "border-red-500" : ""
              }`}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label htmlFor="start_date" className="block text-sm font-semibold">
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={projectData.start_date}
              onChange={handleChange}
              className={`mt-2 p-2 border border-gray-300 rounded w-full ${
                errors.start_date ? "border-red-500" : ""
              }`}
              required
            />
            {errors.start_date && (
              <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>
            )}
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label htmlFor="end_date" className="block text-sm font-semibold">
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={projectData.end_date}
              onChange={handleChange}
              className={`mt-2 p-2 border border-gray-300 rounded w-full ${
                errors.end_date ? "border-red-500" : ""
              }`}
              required
            />
            {errors.end_date && (
              <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>
            )}
          </div>

          {/* Project Status */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-semibold">
              Project Status
            </label>
            <select
              id="status"
              name="status"
              value={projectData.status}
              onChange={handleChange}
              className={`mt-2 p-2 border border-gray-300 rounded w-full ${
                errors.status ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              {/* <option value="completed">Completed</option> */}
              <option value="on-hold">On Hold</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status}</p>
            )}
          </div>

          {/* Project Priority */}
          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-semibold">
              Project Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={projectData.priority}
              onChange={handleChange}
              className={`mt-2 p-2 border border-gray-300 rounded w-full ${
                errors.priority ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-xs mt-1">{errors.priority}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
