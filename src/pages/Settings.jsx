import React, { useEffect, useState } from "react";
import ProjectToolbar from "../components/ProjectToolbar";
import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";
import { useNavigate } from "react-router-dom";
import SettingsPage from "../components/SettingsPage";

const Settings = () => {
  const [trigger, setTrigger] = useState(1);
  const [isNavOpen, setIsNavOpen] = useState(false); // ✅ One useState for navbar

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
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Mobile Menu Button */}
      <div>
        <button
          onClick={() => setIsNavOpen(true)}
          className="lg:hidden bg-blue-900 text-white px-4 py-2 m-4 rounded z-20"
        >
          ☰ Menu
        </button>
      </div>

      {/* Mobile Navbar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-blue-900 text-white p-4 z-30 transform transition-transform duration-300 ease-in-out 
        ${isNavOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Project Toolbar</h2>
          <button
            onClick={() => setIsNavOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>
        <ProjectToolbar
          handleTrigger={() => {
            setTrigger(trigger + 1);
          }}
          user_id={currentUserData.user_id}
        />
      </div>

      {/* Desktop Sidebar */}
      <div className={`lg:block w-1/6 bg-blue-900 p-4 hidden lg:block`}>
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
      <div className="w-full lg:w-5/6 bg-white p-6">
        <h1 className="text-2xl font-semibold pb-4">Your Settings!</h1>
        <SettingsPage />
      </div>
    </div>
  );
};

export default Settings;
