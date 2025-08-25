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
          <div className="min-w-[1000px] bg-white rounded-xl shadow-xl w-full max-w-7xl mx-auto mt-12 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 px-6 pt-6 mb-6 text-center tracking-tight">
              Project Timeline – Next 10 Days
            </h2>

            <div className="flex">
              {/* Task Column */}
              <div className="w-1/6 bg-gray-50 border-r border-gray-200 sticky left-0 z-10">
                {/* Header cell */}
                <div className="h-12 flex items-center justify-center font-semibold text-gray-700 border-b bg-gray-100 text-sm">
                  Task
                </div>
                {/* Task labels */}
                {tasks.map((t) => (
                  <div
                    key={t.task_id}
                    className="h-12 flex items-center p-2 border-b border-gray-200 truncate text-sm font-medium text-gray-800 hover:bg-gray-100"
                    title={t.title}
                  >
                    {t.title}
                  </div>
                ))}
              </div>

              {/* Timeline Column */}
              <div className="w-5/6 overflow-hidden relative">
                {/* Header Row */}
                <div
                  className="grid border-b border-gray-300 bg-gray-100 text-sm text-gray-600"
                  style={{
                    gridTemplateColumns: `repeat(${NUM_DAYS}, minmax(60px, 1fr))`,
                  }}
                >
                  {Array.from({ length: NUM_DAYS }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 flex items-center justify-center font-semibold border-l border-gray-200"
                    >
                      {baseDate ? getDateForOffset(baseDate, i) : ""}
                    </div>
                  ))}
                </div>

                {/* Task Bars */}
                <div className="relative">
                  {tasks.map((task) => {
                    const startOffset = getDayOffset(baseDate, task.start_date);
                    const endOffset = getDayOffset(baseDate, task.end_date);

                    if (endOffset < 0 || startOffset > NUM_DAYS - 1) {
                      return null;
                    }

                    const colStart = Math.max(0, startOffset);
                    const colEnd = Math.min(NUM_DAYS - 1, endOffset);
                    const colSpan = Math.max(1, colEnd - colStart + 1);

                    const taskColorClass = getTaskColor(task.end_date);

                    return (
                      <div
                        key={task.task_id}
                        className="relative h-12 flex items-center"
                      >
                        <div
                          className={`absolute h-4 rounded-md shadow-md transition-all duration-300 ${taskColorClass}`}
                          style={{
                            left: `${(colStart / NUM_DAYS) * 100}%`,
                            width: `${(colSpan / NUM_DAYS) * 100}%`,
                          }}
                          title={`${task.title} (${formatDate(
                            task.start_date
                          )} → ${formatDate(task.end_date)})`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 pb-6 text-sm text-gray-500 text-center italic">
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
