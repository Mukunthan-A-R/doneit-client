import React from "react";
import { format, addDays, isBefore, isToday, getDay } from "date-fns";

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
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <p className="text-sm text-gray-500 font-medium">
          {format(start, "dd MMM yyyy")} — {format(end, "dd MMM yyyy")}
        </p>
        <div className="text-sm font-semibold text-gray-700">
          <span className="text-blue-600">Total Tasks:</span>{" "}
          <span className="text-gray-900">{totalTasks}</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {dates.map((date, i) => {
          const dayOfWeek = getDay(date); // 0 = Sunday
          const today = isToday(date);
          const isSunday = dayOfWeek === 0;
          const dateKey = format(date, "yyyy-MM-dd");
          const tasks = isSunday ? [] : tasksByDate[dateKey] || [];

          return (
            <div
              key={i}
              className={`
                flex flex-col justify-between p-4 rounded-md border transition-all min-h-[140px]
                ${
                  isSunday
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "bg-white border-gray-200 hover:shadow-md cursor-pointer relative"
                }
                ${
                  today && !isSunday
                    ? "border-blue-600 ring-2 ring-blue-200"
                    : ""
                }
              `}
            >
              {/* Date + Day */}
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`font-semibold ${
                    today && !isSunday
                      ? "text-blue-600"
                      : isSunday
                      ? "text-red-600"
                      : "text-gray-800"
                  }`}
                >
                  {format(date, "dd")}
                </span>
                <span
                  className={`text-xs ${
                    isSunday ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {format(date, "EEE")}
                </span>
              </div>

              {/* Tasks (skip Sundays, keep spacing) */}
              {!isSunday ? (
                <div className="flex flex-col gap-1 mt-2 max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
                  {tasks.map((task, idx) => (
                    <span
                      key={idx}
                      title={task.title}
                      className="truncate text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-md font-medium hover:bg-blue-100"
                    >
                      {task.title}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex-1" /> // keeps spacing even
              )}

              {/* Task counter bubble (not for Sundays) */}
              {!isSunday && tasks.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                  {tasks.length}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarCard;
