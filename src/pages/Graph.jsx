import React from "react";
import GanttChart from "../components/GanttChart";
import TaskToolbar from "../components/TaskToolbar";
import { useParams } from "react-router-dom";

const Graph = () => {
  const params = useParams();
  const project_id = params.projectId;

  return (
    <div>
      <div className="min-h-screen flex">
        <div className={`lg:block w-1/6 bg-blue-900 p-4`}>
          <h2 className="text-white">Task Toolbar</h2>
          <TaskToolbar project_id={project_id}></TaskToolbar>
        </div>

        <div className="w-full lg:w-5/6 bg-white p-6">
          <h1 className="text-2xl font-semibold pb-4">Your Projects !</h1>
          <GanttChart projectId={project_id}></GanttChart>
        </div>
      </div>
    </div>
  );
};

export default Graph;
