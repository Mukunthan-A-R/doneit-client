import React, { useEffect, useState } from "react";
import TaskToolbar from "../components/TaskToolbar";
import TaskCardHolder from "../components/TaskCardHolder";
import TaskToolKit from "../components/TaskToolKit";
import { useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";
import { getCollaboratedProjects } from "../services/getCollaboratedProjects";

const TaskDashboard = () => {
  const [trigger, setTrigger] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentUserData = useRecoilValue(userData);

  const handleCreateTask = () => {
    setTrigger(trigger + 1);
  };

  const params = useParams();
  const project_id = params.projectId;

  const currentUserId = currentUserData.user_id;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getCollaboratedProjects(currentUserId);
        const project = data.find((p) => p.project_id === parseInt(project_id));
        setUserRole(project.role);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log("No data");
        } else {
          console.log(err.message);
        }
      }
    };

    if (currentUserId) fetchProjects();
  }, [currentUserId]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`
          bg-blue-900 p-4 w-3/4 max-w-xs
          fixed top-0 h-full 
          ${isSidebarOpen ? "left-0" : "-left-full"} 
          transition-all duration-300 z-20
          lg:static lg:h-auto lg:w-1/6 lg:block
        `}
      >
        {/* Sidebar Header with Close icon */}
        <div className="flex items-center justify-between lg:justify-center mb-4">
          {/* Close icon (only visible on mobile) */}
          <h2 className="text-white text-xl font-medium text-center w-full">
            Task Toolbar
          </h2>

          <button
            className="lg:hidden text-white mr-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-between">
          <TaskToolbar project_id={project_id} />
          <div>
            <TaskToolKit
              userRole={userRole}
              project_id={project_id}
              onCreateTask={handleCreateTask}
            />
          </div>
        </div>
      </div>

      {/* Hamburger button for mobile */}
      <button
        className="absolute top-4 left-4 block lg:hidden bg-blue-800 text-white px-4 py-2 rounded shadow-md focus:outline-none z-10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          Menu
        </span>
      </button>

      {/* Main Content */}
      <div className="w-full lg:w-5/6 bg-white p-6">
        <h1 className="text-2xl font-semibold pb-4 pt-14 lg:pt-0">
          Your Tasks Tracker !
        </h1>
        <TaskCardHolder
          userRole={userRole}
          project_id={project_id}
          value={trigger}
        />
      </div>
    </div>
  );
};

export default TaskDashboard;
