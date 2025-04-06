import React from "react";

const TaskCard = ({
  task_id,
  title,
  status,
  desc,
  startDate,
  endDate,
  timeDuration,
}) => {
  const remainingTime = calculateRemainingTime(endDate);
  const endTime = formatDate(endDate);
  const startTime = formatDate(startDate);

  return (
    <div key={task_id} className="p-4 my-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl text-gray-700 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 pb-3">{desc}</p>
      {/* <p className="text-base text-gray-700">Status: {status}</p> */}
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
