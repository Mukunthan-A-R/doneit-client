import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/TaskServices";
import TaskToolbar from "../components/TaskToolbar";
import { useRecoilValue } from "recoil";
import { ProjectState } from "../data/atom";
import { useParams } from "react-router-dom";
import ProjectTitleCard from "../components/ProjectTitleCard";

const TaskListView = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const currentProject = useRecoilValue(ProjectState);
  const { projectId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedTasks = await fetchTasks(projectId);
        setTasks(fetchedTasks.data);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, [projectId, currentProject]);

  if (error) {
    return <div className="text-red-500 font-medium p-6">Error: {error}</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-gray-500 font-medium p-6">Loading tasks...</div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-800 flex flex-col"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Sidebar */}
        <aside className="lg:block w-1/6 bg-blue-900 p-4 hidden lg:block">
          <h2 className="text-white text-lg font-semibold mb-4">
            Task Toolbar
          </h2>
          <TaskToolbar project_id={projectId} />
        </aside>

        {/* Main Content */}
        <main className="p-6 w-full lg:w-10/12">
          <ProjectTitleCard project_id={projectId} />

          {/* Header */}
          <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-xl flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">📋 Task List</h1>
            <div className="text-sm font-medium opacity-80">
              Current Project:{" "}
              <span className="font-semibold">{currentProject}</span>
            </div>
          </header>

          {/* Task List */}
          <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-center mb-6 text-gray-900">
              Your Tasks
            </h2>
            <div className="space-y-5">
              {tasks.map((task, index) => (
                <TaskCard key={task.id ?? `task-${index}`} task={task} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const TaskCard = ({ task }) => {
  const statusStyles = {
    completed: "bg-green-100 text-green-700",
    "not started": "bg-red-100 text-red-700",
    "in progress": "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition duration-300 transform hover:scale-[1.01] border border-gray-200 space-y-4">
      {/* Title + Status */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
            statusStyles[task.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {task.description}
      </p>

      {/* Dates Footer */}
      <div className="flex justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
        <div>
          <span className="font-medium text-gray-600">Start:</span>{" "}
          {task.start_date ? formatDate(task.start_date) : "N/A"}
        </div>
        <div>
          <span className="font-medium text-gray-600">Due:</span>{" "}
          {task.end_date ? formatDate(task.end_date) : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default TaskListView;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};
