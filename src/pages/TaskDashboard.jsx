import React, { useState } from "react";
import TaskToolbar from "../components/TaskToolbar";
import TaskCardHolder from "../components/TaskCardHolder";
import TaskToolKit from "../components/TaskToolKit";

const TaskDashboard = () => {
  const [trigger, setTrigger] = useState(1);
  const handleCreateTask = () => {
    setTrigger(trigger + 1);
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
        <h1 className="text-2xl font-semibold pb-4">Your Tasks Tracker !</h1>
        <TaskCardHolder value={trigger}></TaskCardHolder>
      </div>
    </div>
  );
};

export default TaskDashboard;
