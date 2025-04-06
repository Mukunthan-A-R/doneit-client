import React from "react";

const TaskCard = ({
  task_id,
  title,
  status,
  startDate,
  endDate,
  timeDuration,
}) => {
  return (
    <div key={task_id} className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-base text-gray-700">Status: {status}</p>
      <p className="text-sm text-gray-600">Start Date: {startDate}</p>
      <p className="text-sm text-gray-600">End Date: {endDate}</p>
      <p className="text-sm text-gray-600">Duration: {timeDuration}</p>
    </div>
  );
};

export default TaskCard;
