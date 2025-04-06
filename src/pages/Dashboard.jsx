import React, { useState } from "react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar is open by default on desktops

  return (
    <div className="h-screen flex">
      <div className={`lg:block w-1/5 bg-blue-900 p-4`}>
        {/* Sidebar Content */}
        <h2 className="text-white">Dashboard Sidebar</h2>
      </div>

      <div className="w-full lg:w-4/5 bg-white p-6">
        <h1 className="text-2xl font-semibold">Main Dashboard Content</h1>
        <p className="mt-4 text-gray-700">
          This is the main content area of the dashboard. You can add more
          content here, such as charts, tables, or other UI elements.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
