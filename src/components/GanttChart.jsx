import { useEffect, useState } from "react";
import useProjectTasks from "../hooks/useProjectTasks";
import ErrorHandler from "./ErrorHandler";

const NUM_DAYS = 12;

// Format date for header cells
const formatDate = (dateStr) => {
  const options = { month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

// Get display date for header columns
const getDateForOffset = (baseDate, offset) => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + offset);
  return formatDate(date);
};

// Get offset (in days) between two dates
const getDayOffset = (start, end) => {
  const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
  return Math.round(diff);
};

// Determine task color
const getTaskColor = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "bg-red-500"; // Overdue
  if (diff <= 3) return "bg-yellow-400"; // Due soon
  return "bg-blue-600"; // Normal
};

const GanttChart = ({ projectId }) => {
  const { tasks, error, isLoading } = useProjectTasks(projectId);
  const [baseDate, setBaseDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    const twoDaysBefore = new Date(today);
    twoDaysBefore.setDate(today.getDate() - 2);
    setBaseDate(twoDaysBefore);
  }, []);

  if (isLoading)
    return (
      <div className="text-center py-6 text-gray-500 animate-pulse">
        Loading Gantt chart...
      </div>
    );

  if (error) return <ErrorHandler error={error} />;

  return (
    <>
      {tasks?.length === 0 ? (
        <p className="flex flex-col justify-center items-center p-40 text-green-800 text-lg sm:text-xl">
          Your graph is waiting for some action! Add a task to bring your
          project to life.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[800px] bg-white rounded-xl shadow-xl p-6 w-full max-w-7xl mx-auto mt-12 border border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center tracking-tight">
              📊 Project Timeline – Next {NUM_DAYS} Days
            </h2>

            {/* Grid Header */}
            <div className="grid grid-cols-13 font-medium text-[11px] text-gray-700 border-b pb-3 mb-5">
              <div className="col-span-1 pl-2">Task</div>
              <div className="col-span-12 grid grid-cols-12 gap-[1px]">
                {Array.from({ length: NUM_DAYS }).map((_, i) => (
                  <div
                    key={i}
                    className="text-center py-1 bg-gray-100 text-gray-600 border border-gray-300 font-semibold rounded-sm"
                  >
                    {getDateForOffset(baseDate, i)}
                  </div>
                ))}
              </div>
            </div>

            {/* Task Rows */}
            <div className="space-y-3">
              {tasks.map((task) => {
                const startOffset = getDayOffset(baseDate, task.start_date);
                const endOffset = getDayOffset(baseDate, task.end_date);

                // Skip if task is completely outside the visible window
                if (endOffset < 0 || startOffset > NUM_DAYS - 1) {
                  return null;
                }

                // Clamp the task bar to visible range
                const colStart = Math.max(0, startOffset);
                const colEnd = Math.min(NUM_DAYS - 1, endOffset);
                const colSpan = Math.max(1, colEnd - colStart + 1);

                const taskColorClass = getTaskColor(task.end_date);

                return (
                  <div
                    key={task.task_id}
                    className="grid grid-cols-13 items-center text-sm group relative"
                  >
                    <div className="col-span-1 font-medium text-gray-800 truncate pl-2">
                      {task.title}
                    </div>
                    <div className="col-span-12 grid grid-cols-12 gap-[1px] relative h-6">
                      <div
                        className={`absolute h-full rounded-md shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-[1.01] ${taskColorClass}`}
                        style={{
                          left: `${(colStart / NUM_DAYS) * 100}%`,
                          width: `${(colSpan / NUM_DAYS) * 100}%`,
                        }}
                        title={`${task.title} (${formatDate(
                          task.start_date
                        )} → ${formatDate(task.end_date)})`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-8 text-sm text-gray-500 text-center italic">
              Displaying a {NUM_DAYS}-day window starting from{" "}
              <span className="font-semibold text-gray-700">
                {baseDate ? formatDate(baseDate) : "N/A"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GanttChart;
