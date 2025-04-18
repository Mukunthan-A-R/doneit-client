import React, { useState } from "react";
import { createTask } from "../../services/TaskServices"; // Import the function to create task
import { useRecoilValue } from "recoil";
import { ProjectState } from "../../data/atom";

const CreateTask = ({ show, onClose, onCreateTask }) => {
  const currentProjectId = useRecoilValue(ProjectState);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "not started",
    time_duration: 0,
    start_date: "",
    end_date: "",
    project_id: currentProjectId,
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    status: "",
    time_duration: "",
    start_date: "",
    end_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {
      title: "",
      description: "",
      status: "",
      time_duration: "",
      start_date: "",
      end_date: "",
    };

    // Check if title is at least 5 characters and not empty
    if (taskData.title.trim() === "" || taskData.title.length < 5) {
      newErrors.title = "Title is required and must be at least 5 characters.";
      formIsValid = false;
    }

    // Check if description is at least 5 characters and not empty
    if (taskData.description.trim() === "" || taskData.description.length < 5) {
      newErrors.description =
        "Description is required and must be at least 5 characters.";
      formIsValid = false;
    }

    // Check if time duration is filled and valid
    if (taskData.time_duration <= 0) {
      newErrors.time_duration =
        "Time duration is required and must be greater than 0.";
      formIsValid = false;
    }

    // Check if start date is filled
    if (taskData.start_date.trim() === "") {
      newErrors.start_date = "Start date is required.";
      formIsValid = false;
    }

    // Check if end date is filled
    if (taskData.end_date.trim() === "") {
      newErrors.end_date = "End date is required.";
      formIsValid = false;
    }

    // Ensure start date is before end date
    if (new Date(taskData.start_date) > new Date(taskData.end_date)) {
      newErrors.end_date = "End date must be later than start date.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't submit if form is invalid
    }

    try {
      // Call the createTask function to create a new task
      const newTask = await createTask(taskData);
      console.log("Task created successfully:", newTask);
      onClose(); // Close the modal after submission
      onCreateTask();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task.");
    }
  };

  if (!show) return null; // Don't render if show is false

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Create Task</h2>

        <form onSubmit={handleSubmit}>
          {/* Task Title Field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Task Description Field */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
            />
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Task Status Field */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-semibold">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={taskData.status}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="not started">Not Started</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-600 text-sm">{errors.status}</p>
            )}
          </div>

          {/* Time Duration Field */}
          <div className="mb-4">
            <label
              htmlFor="time_duration"
              className="block text-sm font-semibold"
            >
              Time Duration (in hours)
            </label>
            <input
              type="number"
              id="time_duration"
              name="time_duration"
              value={taskData.time_duration}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
            />
            {errors.time_duration && (
              <p className="text-red-600 text-sm">{errors.time_duration}</p>
            )}
          </div>

          {/* Start Date Field */}
          <div className="mb-4">
            <label htmlFor="start_date" className="block text-sm font-semibold">
              Start Date
            </label>
            <input
              type="datetime-local"
              id="start_date"
              name="start_date"
              value={taskData.start_date}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
            />
            {errors.start_date && (
              <p className="text-red-600 text-sm">{errors.start_date}</p>
            )}
          </div>

          {/* End Date Field */}
          <div className="mb-4">
            <label htmlFor="end_date" className="block text-sm font-semibold">
              End Date
            </label>
            <input
              type="datetime-local"
              id="end_date"
              name="end_date"
              value={taskData.end_date}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
            />
            {errors.end_date && (
              <p className="text-red-600 text-sm">{errors.end_date}</p>
            )}
          </div>

          {/* Form submission */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={onClose} // Close modal
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
