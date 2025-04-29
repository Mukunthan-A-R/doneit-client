import React, { useState } from "react";
import AddUserRoles from "../components/AddUserRoles";
import TaskToolbar from "../components/TaskToolbar";
import { useParams } from "react-router-dom";

const AddProjectUser = () => {
  const params = useParams();
  const project_id = params.projectId;
  const [isNavOpen, setIsNavOpen] = useState(false); // ✅ One useState for navbar toggle

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar Toggle Button (visible only on small screens) */}
      <div>
        <button
          onClick={() => setIsNavOpen(true)}
          className="lg:hidden bg-blue-900 text-white px-4 py-2 m-4 rounded z-20"
        >
          ☰ Menu
        </button>
      </div>

      {/* Responsive Navbar */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-blue-900 text-white p-4 z-30 transform transition-transform duration-300 ease-in-out 
        ${isNavOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Dashboard Menu</h2>
          <button
            onClick={() => setIsNavOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>
        <TaskToolbar project_id={project_id} />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Sidebar (desktop view) */}
        <div className="lg:block w-1/6 bg-blue-900 p-4 hidden lg:block">
          <h2 className="text-white text-xl font-medium">Task Toolbar</h2>
          <TaskToolbar project_id={project_id}></TaskToolbar>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-5/6 bg-white p-6">
          <h1 className="text-2xl font-semibold pb-4">Your Projects !</h1>
          <AddUserRoles></AddUserRoles>
        </div>
      </div>
    </div>
  );
};

export default AddProjectUser;
