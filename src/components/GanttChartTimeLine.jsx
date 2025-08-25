import { useEffect, useState } from "react";
import useProject from "../hooks/useProject";
import useProjectTasks from "../hooks/useProjectTasks";
import ErrorHandler from "./ErrorHandler";

const GanttChartTimeLine = ({ projectId }) => {
  const { tasks, isLoading, error } = useProjectTasks(projectId);
  const { project } = useProject();

  const [projectStart, setProjectStart] = useState(null);
  const [projectEnd, setProjectEnd] = useState(null);
  const [intervalType] = useState("weekly");

  useEffect(() => {
    if (project) {
      setProjectStart(new Date(project.start_date));
      setProjectEnd(new Date(project.end_date));
    }
  }, [project]);

  const getNumIntervals = () => {
    if (!projectStart || !projectEnd) return 0;
    const start = new Date(projectStart);
    const end = new Date(projectEnd);

    switch (intervalType) {
      case "daily":
        return Math.ceil((end - start) / (24 * 60 * 60 * 1000));
      case "weekly":
        return Math.ceil((end - start) / (7 * 24 * 60 * 60 * 1000));
      case "monthly":
        return (
          (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth()) +
          1
        );
      default:
        return 0;
    }
  };

  const getDateForInterval = (intervalIndex) => {
    if (!projectStart) return "";
    const date = new Date(projectStart);

    switch (intervalType) {
      case "daily":
        date.setDate(date.getDate() + intervalIndex);
        break;
      case "weekly":
        date.setDate(date.getDate() + intervalIndex * 7);
        break;
      case "monthly":
        date.setMonth(date.getMonth() + intervalIndex);
        break;
      default:
        date.setDate(date.getDate() + intervalIndex * 7);
    }

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  // Get color based on how close task end date is
  const getTaskColor = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "bg-red-500";
    if (diff <= 3) return "bg-yellow-400";
    return "bg-blue-600";
  };

  if (isLoading)
    return (
      <div className="text-center py-6 text-gray-500 animate-pulse">
        Loading Gantt chart...
      </div>
    );

  if (error) return <ErrorHandler error={error} />;

  const NUM_INTERVALS = getNumIntervals();
  if (tasks?.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px] bg-white rounded-xl shadow-xl w-full max-w-7xl mx-auto mt-12 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 px-6 pt-6 mb-6 text-center tracking-tight">
          Project Section Graph
        </h2>

        <div className="flex">
          {/* Task Column */}
          <div className="w-1/6 bg-gray-50 border-r border-gray-200 sticky left-0 z-10">
            {/* Header */}
            <div className="h-12 flex items-center justify-center font-semibold text-gray-700 border-b bg-gray-100 text-sm">
              Task
            </div>
            {/* Task Labels */}
            {tasks.map((task) => (
              <div
                key={task.task_id}
                className="h-12 flex items-center p-2 border-b border-gray-200 truncate text-sm font-medium text-gray-800 hover:bg-gray-100"
                title={task.title}
              >
                {task.title}
              </div>
            ))}
          </div>

          {/* Timeline Column */}
          <div className="w-5/6 overflow-hidden relative">
            {/* Header Row */}
            <div
              className="grid border-b border-gray-300 bg-gray-100 text-sm text-gray-600"
              style={{
                gridTemplateColumns: `repeat(${NUM_INTERVALS}, minmax(60px, 1fr))`,
              }}
            >
              {Array.from({ length: NUM_INTERVALS }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 flex items-center justify-center font-semibold border-l border-gray-200"
                >
                  {getDateForInterval(i)}
                </div>
              ))}
            </div>

            {/* Task Bars */}
            <div className="relative">
              {tasks.map((task) => {
                const taskStart = new Date(task.start_date);
                const taskEnd = new Date(task.end_date);

                let offset = 0;
                let duration = 1;

                if (intervalType === "daily") {
                  offset = Math.floor(
                    (taskStart - projectStart) / (24 * 60 * 60 * 1000)
                  );
                  duration =
                    Math.floor((taskEnd - taskStart) / (24 * 60 * 60 * 1000)) +
                    1;
                } else if (intervalType === "weekly") {
                  offset = Math.floor(
                    (taskStart - projectStart) / (7 * 24 * 60 * 60 * 1000)
                  );
                  duration =
                    Math.floor(
                      (taskEnd - taskStart) / (7 * 24 * 60 * 60 * 1000)
                    ) + 1;
                } else if (intervalType === "monthly") {
                  offset =
                    (taskStart.getFullYear() - projectStart.getFullYear()) *
                      12 +
                    (taskStart.getMonth() - projectStart.getMonth());
                  duration =
                    (taskEnd.getFullYear() - taskStart.getFullYear()) * 12 +
                    (taskEnd.getMonth() - taskStart.getMonth()) +
                    1;
                }

                const colStart = Math.max(
                  0,
                  Math.min(NUM_INTERVALS - 1, offset)
                );
                const colSpan = Math.max(
                  1,
                  Math.min(NUM_INTERVALS - colStart, duration)
                );

                const taskColorClass = getTaskColor(task.end_date);

                return (
                  <div
                    key={task.task_id}
                    className="relative h-12 flex items-center"
                  >
                    <div
                      className={`absolute h-4 rounded-md shadow-md transition-all duration-300 ${taskColorClass}`}
                      style={{
                        left: `${(colStart / NUM_INTERVALS) * 100}%`,
                        width: `${(colSpan / NUM_INTERVALS) * 100}%`,
                      }}
                      title={`${task.title} (${getDateForInterval(
                        offset
                      )} → ${getDateForInterval(offset + duration - 1)})`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 pb-6 text-sm text-gray-500 text-center italic">
          Showing {NUM_INTERVALS} {intervalType} intervals from{" "}
          <span className="font-semibold text-gray-700">
            {projectStart?.toLocaleDateString()}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-700">
            {projectEnd?.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GanttChartTimeLine;
