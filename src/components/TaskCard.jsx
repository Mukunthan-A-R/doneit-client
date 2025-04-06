import React, { useState } from "react";

const TaskCard = ({
  task_id,
  title,
  status,
  desc,
  startDate,
  endDate,
  timeDuration,
  onEditClick,
  onStatusChange,
}) => {
  const remainingTime = calculateRemainingTime(endDate);
  const endTime = formatDate(endDate);
  const startTime = formatDate(startDate);

  // State to manage the dropdown menu visibility
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(task_id, newStatus); // This will be handled by TaskCardHolder
    setMenuVisible(false); // Close the menu after selecting a status
  };

  return (
    <div
      key={task_id}
      className="p-4 my-4 bg-white rounded-lg shadow-lg relative"
    >
      {/* Menu Bar (3-dot menu) */}
      <div className="absolute top-2 right-2">
        <button className="text-black font-bold pr-3" onClick={toggleMenu}>
          {/* 3-Dot Icon */}
          <span className="text-xl">...</span>
        </button>

        {/* Dropdown Menu */}
        {menuVisible && (
          <div className="absolute bg-white shadow-md rounded-md mt-2 w-32 p-2">
            <button
              className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleStatusChange("not started")}
            >
              Not Started
            </button>
            <button
              className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleStatusChange("in progress")}
            >
              In Progress
            </button>
            <button
              className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleStatusChange("completed")}
            >
              Completed
            </button>
            <button
              className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => onEditClick(task_id)} // Trigger edit on parent component
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Task Details */}
      <h3 className="text-xl text-gray-700 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 pb-3">{desc}</p>
      <p className="text-sm text-gray-600">Start Date: {startTime}</p>
      <p className="text-sm text-gray-600">End Date: {endTime}</p>
      <p className="text-sm text-gray-600">
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
      </p>
      <p className="text-sm text-gray-600">Duration: {timeDuration}</p>
    </div>
  );
};

export default TaskCard;

const calculateRemainingTime = (endDate) => {
  const currentDate = new Date();
  const end = new Date(endDate);

  const diffInMilliseconds = end - currentDate;
  if (diffInMilliseconds <= 0) {
    return { message: "The project has ended", timeOver: true };
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
    timeOver: false,
  };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Formats to "DD/MM/YYYY"
};
