import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CalendarCard from "../components/CalendarCard";
import TaskToolbar from "../components/TaskToolbar";
import { fetchTasks } from "../services/TaskServices";
import { fetchProjectById } from "../services/ProjectServices";
import ProjectTitleCard from "../components/ProjectTitleCard";

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (project_id) {
      const loadProject = async () => {
        const project = await fetchProjectById(project_id);
        setProjectData(project.data);
      };
      const loadTasks = async () => {
        const tasks = await fetchTasks(project_id);
        const result = formatTasksByDateRange(tasks.data);
        setGraphData(result);
      };

      loadProject();
      loadTasks();
    }
  }, [project_id]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="mt-4 ml-4 z-20 bg-blue-900 text-white px-3 py-2 rounded"
        >
          ☰ Menu
        </button>
      </div>

      {/* Sidebar */}

      <div
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-blue-900 text-white p-4 z-30 transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:static lg:translate-x-0 lg:w-1/5 lg:flex lg:flex-col`}
      >
        <div className="flex justify-between items-center lg:block ">
          <h2 className="text-xl font-semibold">Task Toolbar</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white text-xl"
          >
            ✕
          </button>
        </div>
        <TaskToolbar project_id={project_id} />
        <div className="min-h-screen bg-blue-900"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        {/* Project Title Card */}
        <ProjectTitleCard project_id={project_id}></ProjectTitleCard>

        <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
          <h1 className="text-2xl font-bold"> Project Calendar</h1>
        </header>

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
