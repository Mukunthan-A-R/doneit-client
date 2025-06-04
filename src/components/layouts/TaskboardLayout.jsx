import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import TaskToolbar from "../TaskToolbar";

import { useRecoilValue } from "recoil";
import { CurrentProject, userData } from "../../data/atom";
import { getCollaboratedProjects } from "../../services/getCollaboratedProjects";

const TaskboardLayout = () => {
  const [userRole, setUserRole] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentUserData = useRecoilValue(userData);

  const params = useParams();
  const project_id = params.projectId;

  const currentUserId = currentUserData.user_id;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getCollaboratedProjects(currentUserId);
        const project = data.find((p) => p.project_id === parseInt(project_id));
        if (project) {
          setUserRole(project.role);
        }
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
    <div className="flex flex-col lg:flex-row h-full relative overflow-x-hidden flex-1">
      {/* Sidebar */}
      <div
        className={`
            bg-blue-900 p-2 pr-0 w-full max-w-[16rem]
            transition-all duration-300 flex flex-col
            fixed top-0 h-full pt-20 gap-3
          `}
      >
        {/* Sidebar Header with Close icon */}
        <div className="flex items-center justify-between lg:justify-center ">
          {/* Close icon (only visible on mobile) */}
          <h2 className="text-white text-xl text-center font-medium w-full">
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

        <TaskToolbar project_id={project_id} />
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
      <div className="w-full lg:w-5/6 bg-white p-6 relative ml-[16rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default TaskboardLayout;
