import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userData } from "../../data/atom";
import ProjectToolbar from "../ProjectToolbar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currentUserData = useRecoilValue(userData);

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (!token && location.pathname !== "/login") {
      navigate("/login");
      return;
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col lg:flex-row h-full relative overflow-x-hidden flex-1">
      {/* Sidebar */}
      <div
        className={`
          bg-blue-900 p-2 pr-0 w-[16rem]
          transition-all duration-300 flex flex-col
          fixed top-0 h-full pt-20 z-40
          ${isSidebarOpen ? "left-0" : "-left-64"}
          lg:left-0
        `}
      >
        {/* Title and Close button */}
        <div className="flex items-center justify-between px-4 mb-4">
          <h2 className="text-white font-sans text-xl font-medium">
            Project Toolbar
          </h2>
          {/* Close button visible on mobile only */}
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
              ></path>
            </svg>
          </button>
        </div>

        <ProjectToolbar user_id={currentUserData.user_id} />
      </div>

      {/* Main Content */}
      <div
        className={`
          w-full bg-white p-6 relative
          ${isSidebarOpen ? "ml-[16rem]" : "ml-0"}
          lg:ml-[16rem] lg:w-5/6 transition-all duration-300
        `}
      >
        {/* Hamburger button for mobile (open only) */}
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

        <h1 className="text-xl font-medium pb-4 pt-14 lg:pt-0">
          Welcome {currentUserData.name} !
        </h1>

        <Outlet />
      </div>
    </div>
  );
}
