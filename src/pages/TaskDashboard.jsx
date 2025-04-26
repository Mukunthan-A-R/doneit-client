import React, { useState } from "react";
import TaskToolbar from "../components/TaskToolbar";
import TaskCardHolder from "../components/TaskCardHolder";
import TaskToolKit from "../components/TaskToolKit";
import { useParams } from "react-router-dom";

const TaskDashboard = () => {
  const [trigger, setTrigger] = useState(1);
  const handleCreateTask = () => {
    setTrigger(trigger + 1);
  };

  const params = useParams();
  const project_id = params.projectId;

  return (
    <div className="min-h-screen flex">
      <div className={`lg:block w-1/6 bg-blue-900 p-4`}>
        <h2 className="text-white">Task Toolbar</h2>
        <TaskToolbar project_id={project_id}></TaskToolbar>
      </div>
      <div>
        <TaskToolKit
          project_id={project_id}
          onCreateTask={handleCreateTask}
        ></TaskToolKit>
      </div>
      <div className="w-full lg:w-5/6 bg-white p-6">
        <h1 className="text-2xl font-semibold pb-4">Your Tasks Tracker !</h1>
        <TaskCardHolder
          project_id={project_id}
          value={trigger}
        ></TaskCardHolder>
      </div>
    </div>
  );
};

export default TaskDashboard;
