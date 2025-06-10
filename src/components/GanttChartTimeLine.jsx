import { useEffect, useState } from "react";
import useProject from "../hooks/useProject";
import useProjectTasks from "../hooks/useProjectTasks";
import ErrorHandler from "./ErrorHandler";

const GanttChartTimeLine = ({ projectId }) => {
  const { tasks, isLoading, error } = useProjectTasks(projectId);

  const [projectStart, setProjectStart] = useState(null);
  const [projectEnd, setProjectEnd] = useState(null);
  const [intervalType] = useState("weekly");
  const { project } = useProject();

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
      case "daily": {
        const diffTime = end - start;
        return Math.ceil(diffTime / (24 * 60 * 60 * 1000));
      }
      case "weekly": {
        const diffTime = end - start;
        return Math.ceil(diffTime / (7 * 24 * 60 * 60 * 1000));
      }
      case "monthly": {
        const months =
          (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth());
        return months + 1;
      }
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

  if (isLoading)
    return (
      <div className="text-center py-6 text-gray-500 animate-pulse">
        Loading Gantt chart...
      </div>
    );

  if (error) {
    return <ErrorHandler error={error} />;
  }

  const NUM_INTERVALS = getNumIntervals();

  if (tasks?.length === 0) {
    return;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 pt-6 w-full max-w-7xl mx-auto mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Project Section Graph
      </h2>

      {/* Grid Header */}
      <div className="grid grid-cols-13 font-semibold text-xs text-gray-600 border-b pb-2 mb-4">
        <div className="col-span-1">Task</div>
        <div className="col-span-12 relative">
          <div className="flex w-full absolute left-0 top-0">
            {Array.from({ length: NUM_INTERVALS }).map((_, i) => (
              <div
                key={i}
                className="flex-1 text-center border-l border-gray-200 text-gray-500 py-1"
              >
                {getDateForInterval(i)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Rows */}
      <div className="space-y-3">
        {tasks?.map((task) => {
          const taskStart = new Date(task.start_date);
          const taskEnd = new Date(task.end_date);

          let offset = 0;
          let duration = 1;

          if (intervalType === "daily") {
            offset = Math.floor(
              (taskStart - projectStart) / (24 * 60 * 60 * 1000)
            );
            duration =
              Math.floor((taskEnd - taskStart) / (24 * 60 * 60 * 1000)) + 1;
          } else if (intervalType === "weekly") {
            offset = Math.floor(
              (taskStart - projectStart) / (7 * 24 * 60 * 60 * 1000)
            );
            duration =
              Math.floor((taskEnd - taskStart) / (7 * 24 * 60 * 60 * 1000)) + 1;
          } else if (intervalType === "monthly") {
            offset =
              (taskStart.getFullYear() - projectStart.getFullYear()) * 12 +
              (taskStart.getMonth() - projectStart.getMonth());
            duration =
              (taskEnd.getFullYear() - taskStart.getFullYear()) * 12 +
              (taskEnd.getMonth() - taskStart.getMonth()) +
              1;
          }

          const colStart = Math.max(0, Math.min(NUM_INTERVALS - 1, offset));
          const colSpan = Math.max(
            1,
            Math.min(NUM_INTERVALS - colStart, duration)
          );

          return (
            <div
              key={task.task_id}
              className="grid grid-cols-13 items-center text-sm relative"
            >
              <div className="col-span-1 font-medium text-gray-800 truncate">
                {task.title}
              </div>
              <div className="col-span-12 relative h-6 w-full bg-gray-100 rounded overflow-hidden">
                <div
                  className="absolute h-full rounded-md bg-gradient-to-r from-blue-500 to-blue-700 shadow-md transition-all duration-300"
                  style={{
                    left: `${(colStart / NUM_INTERVALS) * 100}%`,
                    width: `${(colSpan / NUM_INTERVALS) * 100}%`,
                  }}
                  title={`${task.title} (${getDateForInterval(
                    offset
                  )} → ${getDateForInterval(offset + duration - 1)})`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 text-sm text-gray-500 text-center">
        Showing {NUM_INTERVALS} {intervalType} intervals from{" "}
        <strong>{projectStart?.toLocaleDateString()}</strong> to{" "}
        <strong>{projectEnd?.toLocaleDateString()}</strong>
      </div>
    </div>
  );
};

export default GanttChartTimeLine;
