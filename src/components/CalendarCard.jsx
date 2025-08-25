import React, { useState } from "react";
import {
  format,
  addDays,
  isBefore,
  isToday,
  getDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";

// --- Helpers ---
const getDatesInRange = (start, end) => {
  const dates = [];
  let current = new Date(start);
  while (!isBefore(end, current)) {
    dates.push(new Date(current));
    current = addDays(current, 1);
  }
  return dates;
};

const getMonthDays = (date) => {
  const startMonth = startOfMonth(date);
  const endMonthDate = endOfMonth(date);
  const startDate = startOfWeek(startMonth, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(endMonthDate, { weekStartsOn: 1 });

  const days = [];
  let current = startDate;
  while (current <= endDate) {
    days.push(current);
    current = addDays(current, 1);
  }
  return days;
};

// --- Component ---
const CalendarCard = ({ startDate, endDate, tasksByDate = {} }) => {
  const [mode, setMode] = useState("project"); // default Project Mode
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = getDatesInRange(start, end);

  const monthDays = getMonthDays(currentMonth);

  const totalTasks = Object.values(tasksByDate).reduce(
    (sum, tasks) => sum + tasks.length,
    0
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <p className="text-lg font-semibold text-gray-700">
          {mode === "calendar"
            ? format(currentMonth, "MMMM yyyy")
            : `${format(start, "dd MMM yyyy")} — ${format(end, "dd MMM yyyy")}`}
        </p>

        <div className="flex items-center gap-4">
          {/* Month Switcher only for Calendar mode */}
          {mode === "calendar" && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
              >
                ◀
              </button>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
              >
                ▶
              </button>
            </div>
          )}

          {/* Total Tasks */}
          <div className="text-sm font-semibold text-gray-700">
            <span className="text-blue-600">Total Tasks:</span>{" "}
            <span className="text-gray-900">{totalTasks}</span>
          </div>

          {/* Mode Switcher */}
          <div className="flex gap-2 bg-gray-100 rounded-md p-1">
            <button
              onClick={() => setMode("project")}
              className={`px-3 py-1 text-sm rounded-md transition ${
                mode === "project"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Project
            </button>
            <button
              onClick={() => setMode("calendar")}
              className={`px-3 py-1 text-sm rounded-md transition ${
                mode === "calendar"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* View Rendering */}
      {mode === "project" ? (
        // ---------------- PROJECT MODE (Timeline Grid) ----------------
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

                {/* Tasks */}
                {!isSunday && (
                  <>
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
                    {tasks.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                        {tasks.length}
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        // ---------------- CALENDAR MODE (Monthly View) ----------------
        <div>
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <div key={i} className={i === 6 ? "text-red-500" : ""}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((day, i) => {
              const isSunday = getDay(day) === 0;
              const dateKey = format(day, "yyyy-MM-dd");
              const tasks = isSunday ? [] : tasksByDate[dateKey] || [];

              return (
                <div
                  key={i}
                  className={`min-h-[120px] p-2 border rounded-md flex flex-col
                    ${
                      !isSameMonth(day, currentMonth)
                        ? "bg-gray-50 text-gray-400"
                        : "bg-white"
                    }
                    ${isSunday ? "bg-red-50 text-red-600" : ""}
                  `}
                >
                  {/* Day number */}
                  <span
                    className={`text-sm font-medium mb-1 ${
                      isSameDay(day, new Date()) && !isSunday
                        ? "text-blue-600"
                        : ""
                    }`}
                  >
                    {format(day, "d")}
                  </span>

                  {/* Tasks */}
                  {!isSunday && (
                    <div className="flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {tasks.map((task, idx) => (
                        <span
                          key={idx}
                          className="truncate text-xs bg-blue-50 text-blue-700 border border-blue-200 px-1 rounded hover:bg-blue-100"
                          title={task.title}
                        >
                          {task.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarCard;
