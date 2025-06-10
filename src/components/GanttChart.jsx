import { useEffect, useState } from "react";
import useProjectTasks from "../hooks/useProjectTasks";
import ErrorHandler from "./ErrorHandler";

const NUM_DAYS = 12;
const getDayOffset = (start, end) => {
  const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
  return Math.round(diff);
};

const formatDate = (dateStr) => {
  const options = { month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const getDateForOffset = (baseDate, offset) => {
  const date = new Date(baseDate);
  date.setDate(baseDate?.getDate() + offset);
  return formatDate(date);
};

const GanttChart = ({ projectId }) => {
  const { tasks, error, isLoading } = useProjectTasks(projectId);
  const [baseDate, setBaseDate] = useState(null);

  useEffect(() => {
    if (tasks?.length > 0) {
      const earliest = tasks.reduce((min, task) =>
        new Date(task.start_date) < new Date(min.start_date) ? task : min
      );
      setBaseDate(new Date(earliest.start_date));
    }
  }, [tasks]);

  if (isLoading)
    return (
      <div className="text-center py-6 text-gray-500 animate-pulse">
        Loading Gantt chart...
      </div>
    );

  if (error) {
    return <ErrorHandler error={error} />;
  }

  return (
    <>
      {tasks?.length === 0 ? (
        <p className="flex flex-col justtify-center items-center p-40 text-green-800 text-lg sm:text-xl">
          Your graph is waiting for some action! Add a task to bring your
          project to life.
        </p>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-4 pt-6 w-full max-w-7xl mx-auto mt-10 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            12 Day Project Graph
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
                  {getDateForOffset(baseDate, i)}
                </div>
              ))}
            </div>
          </div>

          {/* Task Rows */}
          <div className="space-y-3">
            {tasks?.map((task) => {
              const offset = getDayOffset(baseDate, task.start_date);
              const duration = getDayOffset(task.start_date, task.end_date) + 1;

              const colStart = Math.max(0, Math.min(NUM_DAYS - 1, offset));
              const colSpan = Math.max(
                1,
                Math.min(NUM_DAYS - colStart, duration)
              );

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
          <div className="mt-6 text-sm text-gray-500 text-center">
            Showing {NUM_DAYS} day window from{" "}
            <strong>{formatDate(baseDate)}</strong>
          </div>
        </div>
      )}
    </>
  );
};

export default GanttChart;
