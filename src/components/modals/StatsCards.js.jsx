import React from "react";

const StatsCards = ({ todaysTasks }) => {
  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Filter tasks based on start and end date
  const activeTasks = todaysTasks.filter((task) => {
    const startDate = task.start_date.split("T")[0];
    const endDate = task.end_date.split("T")[0];

    // Show tasks where today's date is between the start and end dates
    return (
      (startDate <= today && endDate >= today) || // If today is between start and end dates
      startDate === today || // If start date is today
      endDate === today // If end date is today
    );
  });

  const todayDate = new Date();
  const formattedDate = todayDate.toISOString().slice(0, 10);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-blue-800 text-white font-semibold text-lg">
        Today's Tasks
        <p className="text-white font-semibold text-base">
          Date : {formattedDate}
        </p>
      </div>

      {activeTasks.length === 0 ? (
        <div className="p-4 text-gray-500">No active tasks for today.</div>
      ) : (
        <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {activeTasks.map((task) => (
            <li
              key={task.task_id}
              className="p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex flex-col">
                {/* Task Title */}
                <p className="font-medium text-lg text-gray-800">
                  {task.title}
                </p>

                {/* Project Name */}
                <p className="text-sm text-blue-600 italic">
                  {task.project_name}
                </p>

                {/* Date Range */}
                <p className="text-xs text-gray-500">
                  {new Date(task.start_date).toLocaleDateString()} →{" "}
                  {new Date(task.end_date).toLocaleDateString()}
                </p>
              </div>

              {/* Task Status */}
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  task.status === "in progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : task.status === "not started"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatsCards;
