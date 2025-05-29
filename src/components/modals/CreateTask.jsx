import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userData } from "../../data/atom"; // Adjust path if needed
import { createTask } from "../../services/TaskServices";
import { fetchProjectById } from "../../services/ProjectServices";
import { createActivityLog } from "../../services/projectActivity"; // You said you'll create this service

const CreateTask = ({ project_id, show, onClose, onCreateTask }) => {
  const currentUserData = useRecoilValue(userData);
  const user_id = currentUserData?.user_id;

  const [taskLine, setTaskLine] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "not started",
    time_duration: 0,
    start_date: "",
    end_date: "",
    project_id: project_id,
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    status: "",
    time_duration: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await fetchProjectById(project_id);
        setTaskLine({
          start_date: data.start_date,
          end_date: data.end_date,
        });
      } catch (err) {
        console.log("Error", err);
      }
    };

    getProject();
  }, [project_id]);

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

    if (taskData.title.trim() === "" || taskData.title.length < 5) {
      newErrors.title = "Title is required and must be at least 5 characters.";
      formIsValid = false;
    }

    if (taskData.description.trim() === "" || taskData.description.length < 5) {
      newErrors.description =
        "Description is required and must be at least 5 characters.";
      formIsValid = false;
    }

    if (
      parseInt(taskData.time_duration) <= 0 ||
      parseInt(taskData.time_duration) > 24
    ) {
      newErrors.time_duration =
        "Working hours per day must be between 1 and 24.";
      formIsValid = false;
    }

    if (taskData.start_date.trim() === "") {
      newErrors.start_date = "Start date is required.";
      formIsValid = false;
    }

    if (taskData.end_date.trim() === "") {
      newErrors.end_date = "End date is required.";
      formIsValid = false;
    }

    const taskStart = new Date(taskData.start_date);
    const taskEnd = new Date(taskData.end_date);

    if (taskStart > taskEnd) {
      newErrors.end_date = "End date must be later than start date.";
      formIsValid = false;
    }

    if (taskLine) {
      const projectStart = new Date(taskLine.start_date);
      const projectEnd = new Date(taskLine.end_date);

      if (taskStart < projectStart || taskStart > projectEnd) {
        newErrors.start_date =
          "Start date must be within the project timeline.";
        formIsValid = false;
      }

      if (taskEnd < projectStart || taskEnd > projectEnd) {
        newErrors.end_date = "End date must be within the project timeline.";
        formIsValid = false;
      }
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    setLoadingData(true);

    try {
      const formattedTaskData = {
        ...taskData,
        start_date: `${taskData.start_date}T00:00:00Z`,
        end_date: `${taskData.end_date}T23:59:59Z`,
      };

      const newTask = await createTask(formattedTaskData);
      console.log("Task created successfully:", newTask);

      // Create activity log after task creation
      await createActivityLog({
        user_id,
        project_id: newTask.data.project_id,
        task_id: newTask.data.task_id,
        action: "create",
        context: {
          title: newTask.data.title,
        },
      });

      onClose();
      onCreateTask();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task.");
    } finally {
      setLoadingData(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Create Task</h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
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

          {/* Description */}
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

          {/* Status */}
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

          {/* Time Duration */}
          <div className="mb-4">
            <label
              htmlFor="time_duration"
              className="block text-sm font-semibold"
            >
              Work hours per day
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

          {/* Start Date */}
          <div className="mb-4">
            <label htmlFor="start_date" className="block text-sm font-semibold">
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={taskData.start_date}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
              min={taskLine?.start_date?.slice(0, 10)}
              max={taskLine?.end_date?.slice(0, 10)}
            />
            {errors.start_date && (
              <p className="text-red-600 text-sm">{errors.start_date}</p>
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
              value={taskData.end_date}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
              min={taskLine?.start_date?.slice(0, 10)}
              max={taskLine?.end_date?.slice(0, 10)}
            />
            {errors.end_date && (
              <p className="text-red-600 text-sm">{errors.end_date}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loadingData}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loadingData ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
