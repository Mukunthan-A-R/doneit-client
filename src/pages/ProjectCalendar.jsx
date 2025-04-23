import React, { useEffect, useState } from "react";
import ProjectToolbar from "../components/ProjectToolbar";

import CalendarCard from "../components/CalendarCard";
import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";

import { useNavigate } from "react-router-dom";

const ProjectCalendar = () => {
  const [trigger, setTrigger] = useState(1);

  const navigate = useNavigate(); // ✅ This gives you the navigate function

  const currentUserData = useRecoilValue(userData);
  console.log(currentUserData);

  const tasks = {
    "2025-04-20": [
      { title: "Kickoff Meeting" },
      { title: "Design Brief" },
      { title: "Client Approval" },
    ],
    "2025-04-22": [
      { title: "Development Start" },
      { title: "API Spec Finalize" },
    ],
    "2025-05-01": [{ title: "Beta Launch" }],
  };

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");

    if (!token) {
      navigate("/login"); // Redirects to login if token not found
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex">
      <div className={`lg:block w-1/6 bg-blue-900 p-2`}>
        <h2 className="text-white p-6 text-center text-2xl font-bold border-b border-blue-800">
          Project Toolbar
        </h2>
        <ProjectToolbar
          handleTrigger={() => {
            setTrigger(trigger + 1);
          }}
          user_id={currentUserData.user_id}
        ></ProjectToolbar>
      </div>

      <div className="w-full lg:w-5/6 bg-white p-6">
        <h1 className="text-2xl font-semibold pb-4">Your Projects !</h1>
        <CalendarCard
          startDate="2025-04-20"
          endDate="2025-05-05"
          tasksByDate={tasks}
        />
      </div>
    </div>
  );
};

export default ProjectCalendar;
