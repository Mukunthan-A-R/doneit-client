import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/TaskServices";

const GanttChart = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [baseDate, setBaseDate] = useState(null);
  const [error, setError] = useState(null);
  const NUM_DAYS = 12;

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks(projectId);
        setTasks(data.data); // ✅ FIXED: accessing the actual task array

        if (data.data.length > 0) {
          const earliest = data.data.reduce((min, task) =>
            new Date(task.start_date) < new Date(min.start_date) ? task : min
          );
          setBaseDate(new Date(earliest.start_date));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load tasks.");
      }
    };

    if (projectId) getTasks();
  }, [projectId]);

  const getDayOffset = (start, end) => {
    const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
    return Math.round(diff);
  };

  const formatDate = (dateStr) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const getDateForOffset = (offset) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + offset);
    return formatDate(date);
  };

  if (error)
    return <div className="text-red-600 text-center py-4">{error}</div>;

  if (!tasks.length || !baseDate)
    return (
      <div className="text-center py-6 text-gray-500 animate-pulse">
        Loading Gantt chart...
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-7xl mx-auto mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Your Project Graph
      </h2>

      {/* Grid Header */}
      <div className="grid grid-cols-13 font-semibold text-xs text-gray-600 border-b pb-2 mb-4">
        <div className="col-span-1">Task</div>
        <div className="col-span-12 grid grid-cols-12 gap-[1px]">
          {Array.from({ length: NUM_DAYS }).map((_, i) => (
            <div
              key={i}
              className="text-center py-1 bg-gray-100 text-gray-500 border border-gray-200"
            >
              {getDateForOffset(i)}
            </div>
          ))}
        </div>
      </div>

      {/* Task Rows */}
      <div className="space-y-3">
        {tasks.map((task) => {
          const offset = getDayOffset(baseDate, task.start_date);
          const duration = getDayOffset(task.start_date, task.end_date) + 1;

          const colStart = Math.max(0, Math.min(NUM_DAYS - 1, offset));
          const colSpan = Math.max(1, Math.min(NUM_DAYS - colStart, duration));

          return (
            <div
              key={task.task_id}
              className="grid grid-cols-13 items-center text-sm relative"
            >
              <div className="col-span-1 font-medium text-gray-800 truncate">
                {task.title}
              </div>
              <div className="col-span-12 grid grid-cols-12 gap-[1px] relative h-6">
                <div
                  className="absolute h-full rounded-md bg-gradient-to-r from-blue-500 to-blue-700 shadow-md transition-all duration-300"
                  style={{
                    left: `${(colStart / NUM_DAYS) * 100}%`,
                    width: `${(colSpan / NUM_DAYS) * 100}%`,
                  }}
                  title={`${task.title} (${formatDate(task.start_date)} → ${formatDate(task.end_date)})`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 text-sm text-gray-500 text-center">
        Showing {NUM_DAYS} day window from{" "}
        <strong>{formatDate(baseDate)}</strong>
      </div>
    </div>
  );
};

export default GanttChart;
