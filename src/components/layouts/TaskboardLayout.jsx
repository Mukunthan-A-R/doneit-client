import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import TaskToolbar from "../TaskToolbar";
import TrialExpiredOverlay from "../modals/TrialExpiredOverlay";
import useUserSubscription from "../../hooks/useUserSubscription";

const TaskboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const { subscription } = useUserSubscription();
  const expired = subscription && !subscription.is_active;

  const params = useParams();
  const project_id = params.projectId;

  function handleNavigate() {
    return setIsSidebarOpen(false);
  }

  useEffect(() => {
    let timeout;
    if (expired) {
      timeout = setTimeout(() => {
        setShowOverlay(true);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [expired]);

  return (
    <div className="flex flex-col lg:flex-row h-full relative overflow-x-hidden flex-1">
      {/* Sidebar */}
      {showOverlay && <TrialExpiredOverlay />}
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
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Button */}
        <button
          className="absolute left-[105%] top-20 block data-[isopen=true]:opacity-0 transition lg:hidden bg-blue-800 text-white px-4 py-2 rounded shadow-md focus:outline-none z-30"
          onClick={() => setIsSidebarOpen(true)}
          data-isopen={isSidebarOpen}
        >
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Menu
          </span>
        </button>

        <TaskToolbar setNavigate={handleNavigate} project_id={project_id} />
      </div>

      {/* Main Content */}
      <div
        className={`
          w-full bg-white md:p-6 p-3 relative
          ${isSidebarOpen ? "ml-[16rem]" : "ml-0"}
          lg:ml-[16rem] transition-all duration-300 mt-10 sm:mt-0
        `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default TaskboardLayout;
