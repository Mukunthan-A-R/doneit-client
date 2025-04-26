import React, { useState } from "react";
import { updateTask } from "../services/TaskServices"; // Make sure this import is correct

// TaskCard component
const TaskCard = ({
  task_id,
  title,
  status,
  desc,
  startDate,
  endDate,
  timeDuration,
  onEditClick,
  onhandleDelete,
  onStatusChange,
  project_id, // Added project_id prop to pass project_id for the update
}) => {
  const remainingTime = calculateRemainingTime(endDate);
  const endTime = formatDate(endDate);
  const startTime = formatDate(startDate);

  // State to manage the dropdown menu visibility
  const [menuVisible, setMenuVisible] = useState(false);

  // State for popup notifications
  const [notification, setNotification] = useState("");

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleStatusChange = async (newStatus) => {
    // Prepare task data to update
    const updatedTaskData = {
      project_id: project_id, // Ensure project_id is included in the request
      status: newStatus,
      title,
      description: desc,
      start_date: startDate,
      end_date: endDate,
      time_duration: timeDuration,
    };

    try {
      // Send the PUT request to update the task status
      const data = await updateTask(task_id, updatedTaskData); // Ensure you're passing the updated data

      // Show success message
      setNotification({
        type: "success",
        message: "Status updated successfully!",
      });

      setMenuVisible(false); // Close the menu

      // Hide the notification after 2 seconds
      setTimeout(() => {
        setNotification("");
      }, 2000);

      // Update status locally in the parent component
      onStatusChange(task_id, newStatus);
    } catch (err) {
      console.error("Failed to update task status", err);
      // Show failure message
      setNotification({
        type: "failure",
        message: "Failed to update status.",
      });

      // Hide the notification after 2 seconds
      setTimeout(() => {
        setNotification("");
      }, 2000);
    }
  };

  return (
    <div
      key={task_id}
      className="p-4 my-4 bg-white rounded-lg shadow-lg relative"
    >
      {/* Menu Bar (3-dot menu) */}
      <div className="absolute top-2 right-2">
        <button className="text-black font-bold pr-2" onClick={toggleMenu}>
          {/* 3-Dot Icon */}
          <span className="text-xl">...</span>
        </button>

        {/* Dropdown Menu */}
        {menuVisible && (
          <div
            className="absolute bg-white shadow-xl rounded-md mt-2 w-32 p-2 z-50" // Added shadow-xl for more depth
            style={{
              position: "absolute", // Ensure absolute positioning
              top: "100%", // Position the dropdown just below the button
              right: 0, // Align it to the right edge of the button
            }}
          >
            {/* Conditionally render status options */}
            {status !== "not started" && (
              <button
                className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleStatusChange("not started")}
              >
                Not Started
              </button>
            )}
            {status !== "in progress" && (
              <button
                className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleStatusChange("in progress")}
              >
                In Progress
              </button>
            )}
            {status !== "completed" && (
              <button
                className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleStatusChange("completed")}
              >
                Completed
              </button>
            )}
            {/* Edit Button */}
            <button
              className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => onEditClick(task_id)} // Trigger edit on parent component
            >
              Edit
            </button>
            <button
              className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => onhandleDelete(task_id)} // Trigger edit on parent component
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Task Details */}
      <h3 className="text-xl text-gray-700 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 pb-3">{desc}</p>
      <p className="text-sm text-gray-600">Start Date: {startTime}</p>
      <p className="text-sm text-gray-600">End Date: {endTime}</p>
      <span className="text-sm text-gray-600">
        {remainingTime.timeOver === false ? (
          <span className="flex gap-1">
            <p>{remainingTime.message}</p>
            <p> {remainingTime.days} day</p>
            <p> {remainingTime.hours} hrs</p>
            <p>{remainingTime.minutes} min</p>
          </span>
        ) : (
          <p className="text-red-500">{remainingTime.message}</p>
        )}
      </span>
      <p className="text-sm text-gray-600">Work Hours: {timeDuration} hrs</p>

      {/* Notification Popup */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-lg ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default TaskCard;

// Utility functions

const calculateRemainingTime = (endDate) => {
  const currentDate = new Date();
  const end = new Date(endDate);

  const diffInMilliseconds = end - currentDate;
  if (diffInMilliseconds <= 0) {
    return { message: "The Task has ended", timeOver: true };
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
    message: "Time Remaining",
    timeOver: false,
  };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Formats to "DD/MM/YYYY"
};
