import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import TaskToolbar from "../TaskToolbar";

const TaskboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const params = useParams();
  const project_id = params.projectId;

  function handleNavigate() {
    return setIsSidebarOpen(false);
  }

  return (
    <div className="flex flex-col lg:flex-row h-full relative overflow-x-hidden flex-1">
      {/* Sidebar */}
      <div
        className={`
          bg-blue-900 p-2 pr-0 w-[16rem]
          transition-all duration-300 flex flex-col
          fixed top-0 h-full pt-20 gap-3 z-40
          ${isSidebarOpen ? "left-0" : "-left-64"}
          lg:left-0
        `}
      >
        {/* Sidebar Header with Close icon */}
        <div className="flex items-center justify-between px-4 mb-4">
          <h2 className="text-white text-xl font-medium">Task Toolbar</h2>
          {/* Close icon (mobile only) */}
          <button
            className="lg:hidden text-white"
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

        <TaskToolbar setNavigate={handleNavigate} project_id={project_id} />
      </div>

      {/* Hamburger button for mobile (open sidebar) */}
      {!isSidebarOpen && (
        <button
          className="absolute top-4 left-4 block lg:hidden bg-blue-800 text-white px-4 py-2 rounded shadow-md focus:outline-none z-30"
          onClick={() => setIsSidebarOpen(true)}
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
      )}

      {/* Main Content */}
      <div
        className={`
          w-full bg-white p-6 relative
          ${isSidebarOpen ? "ml-[16rem]" : "ml-0"}
          lg:ml-[16rem] lg:w-5/6 transition-all duration-300 mt-10 sm:mt-0
        `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default TaskboardLayout;
