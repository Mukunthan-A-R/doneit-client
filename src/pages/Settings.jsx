import React, { useEffect, useState } from "react";
import ProjectToolbar from "../components/ProjectToolbar";
import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";
import { useNavigate } from "react-router-dom";
import SettingsPage from "../components/SettingsPage";
import GeneralSettingsPanel from "../components/GeneralSettingsPanel";
import ExportProjects from "../components/ExportProjects";
import LogoutButton from "../components/LogoutButton";
import ChangePasswordModal from "../components/ChangePasswordModal";

const Settings = () => {
  const [trigger, setTrigger] = useState(1);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navigate = useNavigate();
  const currentUserData = useRecoilValue(userData);

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsNavOpen(true)}
          className="bg-blue-900 text-white px-4 py-2 m-4 rounded z-20"
        >
          ☰ Menu
        </button>
      </div>

      {/* Mobile Navbar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-blue-900 text-black p-4 z-30 transform transition-transform duration-300 ease-in-out 
        ${isNavOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Project Toolbar</h2>
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
      <div className="hidden lg:flex lg:flex-col lg:w-1/5 bg-blue-900 h-full">
        <h2 className="text-white p-6 pb-0 text-center text-2xl font-medium">
          Project Toolbar
        </h2>
        <ProjectToolbar
          handleTrigger={() => {
            setTrigger(trigger + 1);
          }}
          user_id={currentUserData.user_id}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-white">
        <h1 className="text-2xl font-semibold pb-4">Your Settings!</h1>
        <SettingsPage />
        <div className="flex flex-col w-full  p-6 ">
          <div className="flex-1 w-full">
            <GeneralSettingsPanel />
          </div>
          <ExportProjects></ExportProjects>
          <ChangePasswordModal
            userId={currentUserData.user_id}
          ></ChangePasswordModal>
          <LogoutButton></LogoutButton>
        </div>
      </div>
    </div>
  );
};

export default Settings;
