import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TaskToolbar from "../components/TaskToolbar";
import TaskCardHolder from "../components/TaskCardHolder";
import TaskToolKit from "../components/TaskToolKit";

const TaskDashboard = () => {
  const [trigger, setTrigger] = useState(1);
  const handleCreateTask = () => {
    setTrigger(trigger + 1);
  };

  const params = useParams();
  const project_id = params.projectId;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar on mobile

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar (Navbar) */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-2/3 max-w-xs lg:w-1/6 bg-blue-900 p-4 z-30 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">Task Toolbar</h2>
          {/* Button to close sidebar on mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white text-xl"
          >
            ✕
          </button>
        </div>
        <TaskToolbar project_id={project_id} />
        <TaskToolKit project_id={project_id} onCreateTask={handleCreateTask} />
      </div>

      {/* Button to open sidebar on mobile */}
      <div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden mt-4 ml-4 z-20 bg-blue-900 text-white px-3 py-2 rounded"
        >
          ☰ Menu
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-5/6 bg-white p-6 ml-0 lg:ml-0">
        <h1 className="text-2xl font-semibold pb-4">Your Tasks Tracker !</h1>
        <TaskCardHolder project_id={project_id} value={trigger} />
      </div>
    </div>
  );
};

export default TaskDashboard;
