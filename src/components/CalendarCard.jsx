import React from "react";
import { format, addDays, isBefore, isWeekend, isToday } from "date-fns";

const getDatesInRange = (start, end) => {
  const dates = [];
  let current = new Date(start);
  while (!isBefore(end, current)) {
    dates.push(new Date(current));
    current = addDays(current, 1);
  }
  return dates;
};

const CalendarCard = ({ startDate, endDate, tasksByDate = {} }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = getDatesInRange(start, end);

  const totalTasks = Object.values(tasksByDate).reduce(
    (sum, tasks) => sum + tasks.length,
    0
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 flex-wrap">
        <div>
          <p className="text-sm text-gray-500">
            {format(start, "dd MMM yyyy")} — {format(end, "dd MMM yyyy")}
          </p>
        </div>
        <div className="text-sm font-medium text-gray-700 mt-2 md:mt-0">
          <span className="text-blue-600">Total Tasks:</span>{" "}
          <span className="font-bold text-gray-900">{totalTasks}</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 text-center">
        {dates.map((date, i) => {
          const weekend = isWeekend(date);
          const today = isToday(date);
          const dateKey = format(date, "yyyy-MM-dd");
          const tasks = tasksByDate[dateKey] || [];

          return (
            <div
              key={i}
              className={`
                p-4 rounded-xl transition-all transform
                ${today ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-800"}
                ${weekend && !today ? "bg-red-50 text-red-600" : ""}
                hover:shadow-md hover:scale-[1.02] cursor-pointer
                relative group border border-gray-200
              `}
            >
              <div className="font-semibold text-lg mb-1">
                {format(date, "dd")}
              </div>
              <div
                className={`text-xs ${
                  today ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {format(date, "EEE")}
              </div>

              {/* Tasks under the date */}
              <div className="mt-3 text-left max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pr-1">
                {tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className={`text-sm truncate mb-1 ${
                      today ? "text-white" : "text-gray-700"
                    } group-hover:text-blue-500`}
                    title={task.title}
                  >
                    <span className="flex items-center gap-1">
                      • {task.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Task count tooltip */}
              {tasks.length > 0 && (
                <div className="absolute top-2 right-2 text-[11px] text-white font-medium bg-blue-600 rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                  {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarCard;
