import React, { useEffect, useState } from "react";
import ProjectCardHolder from "../components/ProjectCardHolder";
import ProjectToolbar from "../components/ProjectToolbar";

import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";

import { useNavigate } from "react-router-dom";
import ProjectCollabCardHolder from "../components/ProjectCollabCardHolder";

const Dashboard = () => {
  const [trigger, setTrigger] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const currentUserData = useRecoilValue(userData);
  console.log(currentUserData);

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`
          bg-blue-900 p-2 w-3/4 max-w-xs
          fixed top-0 h-full 
          ${isSidebarOpen ? "left-0" : "-left-full"} 
          transition-all duration-300 z-20
          lg:static lg:h-auto lg:w-1/6 lg:block
        `}
      >
        <h2 className="text-white p-6 text-center text-2xl font-bold border-b border-blue-800">
          Project Toolbar
        </h2>
        <ProjectToolbar
          handleTrigger={() => {
            setTrigger(trigger + 1);
          }}
          user_id={currentUserData.user_id}
        />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-5/6 bg-white p-6 relative">
        {/* Hamburger button for mobile */}
        <button
          className="absolute top-4 left-4 block lg:hidden bg-blue-800 text-white px-4 py-2 rounded shadow-md focus:outline-none z-30"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Close
            </span>
          ) : (
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
          )}
        </button>

        <h1 className="text-2xl font-semibold pb-4 pt-14 lg:pt-0">
          Your Projects !
        </h1>
        {trigger && (
          <ProjectCardHolder
            trigger={trigger}
            user_id={currentUserData.user_id}
          />
        )}
        <div className="bg-red-300">
          <h1 className="text-2xl font-semibold pb-4 pt-14 lg:pt-0">
            Your Collab Projects !
          </h1>
          {trigger && (
            <ProjectCollabCardHolder
              trigger={trigger}
              user_id={currentUserData.user_id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
