import { useEffect, useMemo, useState } from "react";
import useProject from "../hooks/useProject";
import useProjectTasks from "../hooks/useProjectTasks";
import ErrorHandler from "./ErrorHandler";

const GITHUB_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

const formatDate = (date) => date.toISOString().split("T")[0];
const getColorLevel = (count) => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
};

const HeatMap = ({ projectId }) => {
  const [projectStart, setProjectStart] = useState(null);
  const [projectEnd, setProjectEnd] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  //  New state for dropdowns
  const [showIdleDates, setShowIdleDates] = useState(false);
  const [showLightDates, setShowLightDates] = useState(false);

  const { project, isLoading } = useProject(projectId);
  const { tasks, isLoading: loading, error } = useProjectTasks(projectId);

  useEffect(() => {
    if (!project) return;
    if (!isLoading) {
      setProjectStart(new Date(project?.start_date));
      setProjectEnd(new Date(project?.end_date));
    }
  }, [project]);

  const tasksByDate = useMemo(() => {
    if (!projectStart || !projectEnd) return {};
    const map = {};
    tasks?.forEach((task) => {
      let current = new Date(task.start_date);
      const taskEnd = new Date(task.end_date);
      while (current <= taskEnd) {
        if (current >= projectStart && current <= projectEnd) {
          const key = formatDate(current);
          if (!map[key]) map[key] = [];
          map[key].push(task);
        }
        current.setDate(current.getDate() + 1);
      }
    });
    return map;
  }, [tasks, projectStart, projectEnd]);

  const firstMonday = useMemo(() => {
    if (!projectStart) return null;
    const d = new Date(projectStart);
    const day = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - day);
    return d;
  }, [projectStart]);

  const lastSunday = useMemo(() => {
    if (!projectEnd) return null;
    const d = new Date(projectEnd);
    const day = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() + (6 - day));
    return d;
  }, [projectEnd]);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading Heatmap...
      </div>
    );

  if (error) {
    return <ErrorHandler error={error} />;
  }

  const totalTasks = tasks?.length;
  const activeDays = Object.keys(tasksByDate).length;
  const avgTasksPerDay =
    activeDays > 0 ? (totalTasks / activeDays).toFixed(2) : 0;
  const peakDate = Object.entries(tasksByDate).reduce((acc, [date, t]) => {
    if (!acc || t.length > acc.count) return { date, count: t.length };
    return acc;
  }, null);

  const allDates = [];
  let current = new Date(projectStart);
  while (current <= projectEnd) {
    allDates.push(formatDate(current));
    current.setDate(current.getDate() + 1);
  }

  const idleDays = allDates.filter((date) => !tasksByDate[date]);
  const lightWorkDays = allDates.filter(
    (date) => tasksByDate[date]?.length > 0 && tasksByDate[date]?.length <= 2,
  );

  // const completed = tasks?.filter((t) => t.status === "Completed").length;
  // const notStarted = tasks?.filter((t) => t.status === "Not Started").length;
  // const remaining = totalTasks - completed;

  const dateList = [];
  current = new Date(firstMonday);
  while (current <= lastSunday) {
    dateList.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const weekChunks = [];
  for (let i = 0; i < dateList.length; i += 7) {
    weekChunks.push(dateList.slice(i, i + 7));
  }

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="w-full flex flex-col items-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 w-full max-w-full overflow-x-auto overflow-y-hidden">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Project Task Heatmap
        </h2>
        <div className="flex justify-center">
          <div className="flex">
            <div className="flex flex-col justify-between space-y-[15px] pr-1 mt-12">
              {weekChunks.map((week, i) => {
                const month = week[0].toLocaleString("default", {
                  month: "short",
                });
                return (
                  <div
                    key={i}
                    className="text-md font-medium text-gray-500 h-[30px] flex items-center justify-end pr-2"
                  >
                    {month}
                  </div>
                );
              })}
            </div>
            <div>
              <div className="flex space-x-2 mb-3 pl-1">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="w-14 text-lg font-medium text-center text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="flex flex-col space-y-1">
                {weekChunks.map((week, i) => (
                  <div key={i} className="flex space-x-2">
                    {week.map((date, j) => {
                      const isoDate = formatDate(date);
                      const inRange =
                        date >= projectStart && date <= projectEnd;
                      const count = inRange
                        ? tasksByDate[isoDate]?.length || 0
                        : 0;
                      const color = GITHUB_COLORS[getColorLevel(count)];
                      return (
                        <div
                          key={j}
                          title={`${isoDate}\n${(tasksByDate[isoDate] || [])
                            .map((task) => `• ${task.title}`)
                            .join("\n")}`}
                          className="w-14 h-14 rounded-md flex items-center justify-center cursor-pointer transform transition-transform duration-100 ease-in-out hover:scale-110"
                          style={{
                            backgroundColor: color,
                            border: inRange ? "1px solid #d1d5db" : "none",
                            color: count > 2 ? "white" : "black",
                            fontSize: "1rem",
                            userSelect: "none",
                          }}
                          onClick={() => setSelectedDate(isoDate)}
                        >
                          {inRange ? date.getDate() : ""}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-6 text-lg">
          {GITHUB_COLORS.map((color, idx) => {
            const label =
              idx === 0
                ? "0"
                : idx === 1
                  ? "1-2"
                  : idx === 2
                    ? "3-4"
                    : idx === 3
                      ? "5-6"
                      : "7+";
            return (
              <div key={idx} className="flex items-center space-x-2">
                <div
                  style={{ backgroundColor: color }}
                  className="w-7 h-7 rounded-sm border border-gray-300"
                />
                <span className="text-gray-700">{label}</span>
              </div>
            );
          })}
        </div>

        {selectedDate && tasksByDate[selectedDate] && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Tasks on {selectedDate}:
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              {tasksByDate[selectedDate].map((task, idx) => (
                <li key={idx}>{task.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-full overflow-x-auto">
        <h3 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-700 pb-2 mb-4">
          Summary Overview
        </h3>
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-blue-900 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Metric</th>
              <th className="text-left px-4 py-3">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-blue-50">
              <td className="px-4 py-3 font-medium">Total Tasks</td>
              <td className="px-4 py-3 text-blue-900 font-semibold">
                {totalTasks}
              </td>
            </tr>
            <tr className="even:bg-blue-50">
              <td className="px-4 py-3 font-medium">Active Days</td>
              <td className="px-4 py-3 text-blue-800 font-semibold">
                {activeDays}
              </td>
            </tr>
            <tr className="even:bg-blue-50">
              <td className="px-4 py-3 font-medium">Average Tasks/Day</td>
              <td className="px-4 py-3 text-blue-800 font-semibold">
                {avgTasksPerDay}
              </td>
            </tr>
            {peakDate && (
              <tr className="even:bg-blue-50">
                <td className="px-4 py-3 font-medium">Most Active Day</td>
                <td className="px-4 py-3 text-indigo-700 font-semibold">
                  {peakDate.date} ({peakDate.count} tasks)
                </td>
              </tr>
            )}
            <tr className="even:bg-blue-50">
              <td className="px-4 py-3 font-medium">Idle Days</td>
              <td className="px-4 py-3 text-red-700 font-semibold">
                <div className="flex items-center justify-between space-x-2">
                  <span>{idleDays.length}</span>
                  {idleDays.length > 0 && (
                    <button
                      onClick={() => setShowIdleDates((prev) => !prev)}
                      className="inline-flex items-center px-2 py-1 text-sm text-blue-600 border border-blue-500 rounded hover:bg-blue-100 transition-all duration-300"
                    >
                      {showIdleDates ? "Hide" : "Show"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ml-1 transition-transform duration-300 ${
                          showIdleDates ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                <div
                  className={`transition-all overflow-hidden duration-500 ease-in-out ${
                    showIdleDates ? "max-h-[500px] mt-2" : "max-h-0"
                  }`}
                >
                  <div className="text-indigo-700 break-words max-w-xs">
                    {idleDays.join(", ")}
                  </div>
                </div>
              </td>
            </tr>
            <tr className="even:bg-blue-50">
              <td className="px-4 py-3 font-medium">
                Light Work Days (1–2 tasks)
              </td>
              <td className="px-4 py-3 text-green-700 font-semibold">
                <div className="flex items-center justify-between space-x-2">
                  <span>{lightWorkDays.length}</span>
                  {lightWorkDays.length > 0 && (
                    <button
                      onClick={() => setShowLightDates((prev) => !prev)}
                      className="inline-flex items-center px-2 py-1 text-sm text-blue-600 border border-blue-500 rounded hover:bg-blue-100 transition-all duration-300"
                    >
                      {showLightDates ? "Hide" : "Show"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ml-1 transition-transform duration-300 ${
                          showLightDates ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                <div
                  className={`transition-all overflow-hidden duration-500 ease-in-out ${
                    showLightDates ? "max-h-[500px] mt-2" : "max-h-0"
                  }`}
                >
                  <div className="text-indigo-700 break-words max-w-xs">
                    {lightWorkDays.join(", ")}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeatMap;
