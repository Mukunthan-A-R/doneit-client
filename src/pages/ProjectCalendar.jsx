import React, { useState } from "react";

import CalendarCard from "../components/CalendarCard";
import TaskToolbar from "../components/TaskToolbar";
import TaskToolKit from "../components/TaskToolKit";

import { useRecoilValue } from "recoil";
import { CurrentProject } from "../data/atom";

const ProjectCalendar = () => {
  const [trigger, setTrigger] = useState(1);
  const currentProject = useRecoilValue(CurrentProject);

  const handleCreateTask = () => {
    setTrigger(trigger + 1);
  };

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

  return (
    <div className="min-h-screen flex">
      <div className={`lg:block w-1/6 bg-blue-900 p-4`}>
        <h2 className="text-white">Task Toolbar</h2>
        <TaskToolbar></TaskToolbar>
      </div>
      <div>
        <TaskToolKit onCreateTask={handleCreateTask}></TaskToolKit>
      </div>
      <div className="w-full lg:w-5/6 bg-white p-6">
        <CalendarCard
          startDate={currentProject.start_date}
          endDate={currentProject.end_date}
          tasksByDate={tasks}
        />
      </div>
    </div>
  );
};

export default ProjectCalendar;
