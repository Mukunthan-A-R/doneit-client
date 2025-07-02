import React, { useState } from "react";

const StatsCards = ({ todaysTasks }) => {
  const today = new Date().toISOString().split("T")[0];
  const [filter, setFilter] = useState("all");

  const filteredTasks = todaysTasks.filter((task) => {
    const startDate = task.start_date?.split("T")[0];
    const endDate = task.end_date?.split("T")[0];

    const isOngoingToday =
      startDate && endDate && startDate <= today && endDate >= today;

    if (!isOngoingToday) return false;

    if (filter === "all") return true;
    return task.status === filter;
  });

  const todayDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-blue-700 text-white flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">
            Today's Tasks from Your Projects ({filteredTasks.length})
          </h2>
          <p className="text-sm text-blue-100">Date: {todayDate}</p>
        </div>

        <div className="relative">
          <select
            className="bg-white text-blue-800 border border-blue-100 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="p-4 text-gray-500">
          No tasks found for the selected filter.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {filteredTasks.map((task) => (
            <li
              key={task.task_id}
              className="p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex flex-col">
                <p className="font-medium text-lg text-gray-800">
                  {task.title}
                </p>
                <p className="text-sm text-blue-600 italic">
                  {task.project_name}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(task.start_date).toLocaleDateString()} →{" "}
                  {new Date(task.end_date).toLocaleDateString()}
                </p>
              </div>
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
