import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CalendarCard from "../components/CalendarCard";
import TaskToolbar from "../components/TaskToolbar";
import { fetchTasks } from "../services/TaskServices";
import { fetchProjectById } from "../services/ProjectServices";

const ProjectCalendar = () => {
  const params = useParams();
  const project_id = params.projectId;

  const [graphData, setGraphData] = useState({});
  const [ProjectData, setProjectData] = useState({
    id: null,
    name: "",
    description: "",
    project_id: null,
    start_date: null,
    end_date: null,
    priority: "",
    status: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ Only one useState

  useEffect(() => {
    if (project_id) {
      const loadProject = async () => {
        const tasks = await fetchProjectById(project_id);
        setProjectData(tasks.data);
      };
      loadProject();
    }

    if (project_id) {
      const loadTasks = async () => {
        const tasks = await fetchTasks(project_id);
        const result = formatTasksByDateRange(tasks.data);
        setGraphData(result);
      };
      loadTasks();
    }
  }, [project_id]);

  return (
    <div className="min-h-screen">
      {/* Toggle Button - visible only on small screens */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden mt-4 ml-4 z-20 bg-blue-900 text-white px-3 py-2 rounded"
      >
        ☰ Menu
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-2/3 max-w-xs lg:w-1/6 bg-blue-900 p-4 z-30 transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <div className="flex justify-between items-center lg:block">
          <h2 className="text-white">Task Toolbar</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white text-xl"
          >
            ✕
          </button>
        </div>
        <TaskToolbar project_id={project_id}></TaskToolbar>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-5/6 bg-white p-6 ml-0 lg:ml-0">
        <CalendarCard
          startDate={ProjectData.start_date}
          endDate={ProjectData.end_date}
          tasksByDate={graphData}
        />
      </div>
    </div>
  );
};

export default ProjectCalendar;

const formatTasksByDateRange = (taskArray) => {
  const result = {};

  taskArray.forEach((task) => {
    const start = new Date(task.start_date);
    const end = new Date(task.end_date);

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      const formattedDate = date.toISOString().split("T")[0];

      if (!result[formattedDate]) {
        result[formattedDate] = [];
      }

      result[formattedDate].push({ title: task.title });
    }
  });

  return result;
};
