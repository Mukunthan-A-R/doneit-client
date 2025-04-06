import React, { useState } from "react";
import ProjectCardHolder from "../components/ProjectCardHolder";
import ProjectTollbar from "../components/ProjectTollbar";

const Dashboard = () => {
  return (
    <div className="h-screen flex">
      <div className={`lg:block w-1/6 bg-blue-900 p-4`}>
        <h2 className="text-white">Project Toolbar</h2>
        <ProjectTollbar></ProjectTollbar>
      </div>

      <div className="w-full lg:w-5/6 bg-white p-6">
        <h1 className="text-2xl font-semibold pb-4">Your Projects !</h1>
        <ProjectCardHolder></ProjectCardHolder>
      </div>
    </div>
  );
};

export default Dashboard;
