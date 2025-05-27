import React, { useEffect, useState, useMemo } from "react";
import { fetchTasks } from "../services/TaskServices";
import { fetchProjectById } from "../services/ProjectServices";

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
  const [tasks, setTasks] = useState([]);
  const [projectStart, setProjectStart] = useState(null);
  const [projectEnd, setProjectEnd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    Promise.all([fetchProjectById(projectId), fetchTasks(projectId)])
      .then(([projRes, taskRes]) => {
        const projData = projRes.data;
        setProjectStart(new Date(projData.start_date));
        setProjectEnd(new Date(projData.end_date));
        setTasks(taskRes.data || []);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load project or tasks.");
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  const tasksByDate = useMemo(() => {
    if (!projectStart || !projectEnd) return {};
    const map = {};
    tasks.forEach((task) => {
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
        Loading heatmap...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        {error}
      </div>
    );

  if (!projectStart || !projectEnd) return null;

  const dateList = [];
  let current = new Date(firstMonday);
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
    <div className="w-full flex justify-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 w-full max-w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Project Task Heatmap
        </h2>
        <div className="flex justify-center">
          <div className="flex">
            <div className="flex flex-col mr-4 w-20">
              {weekChunks.map((week, i) => {
                const month = week[0].toLocaleString("default", {
                  month: "short",
                });
                return (
                  <div
                    key={i}
                    className="h-14 flex items-center justify-end text-lg text-gray-600 pr-3"
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
                          title={`${isoDate}\nTasks: ${count}`}
                          className="w-14 h-14 rounded-md flex items-center justify-center cursor-default"
                          style={{
                            backgroundColor: color,
                            border: inRange ? "1px solid #d1d5db" : "none",
                            color: count > 2 ? "white" : "black",
                            fontSize: "1rem",
                            userSelect: "none",
                          }}
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
      </div>
    </div>
  );
};

export default HeatMap;
