import React from "react";
import ProjectToolbar from "../components/ProjectToolbar";

const UserDashboard = () => {
  return (
    <div>
      <div className={`lg:block w-1/6 bg-blue-900 p-4`}>
        <h2 className="text-white">Project Toolbar</h2>
      </div>

      <div className="w-full lg:w-5/6 bg-white p-6">
        <h1 className="text-2xl font-semibold pb-4">Your Projects !</h1>
      </div>
    </div>
  );
};

export default UserDashboard;
