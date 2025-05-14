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
  const [statusFilter, setStatusFilter] = useState("all");
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

  const filteredTasks =
    statusFilter === "all"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

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
      className="min-h-screen bg-gray-100 text-gray-800 flex flex-col"
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
          <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
            <h1 className="text-2xl font-bold">📋 Task List</h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="text-sm font-medium opacity-90 flex items-center gap-2">
                Filter by Status:
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2 py-1 rounded bg-white text-gray-800 text-sm border border-gray-300"
                >
                  <option value="all">All</option>
                  <option value="not started">Not Started</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
              {/* <div className="text-sm font-medium opacity-80">
                Current Project:{" "}
                <span className="font-semibold">{projectId}</span>
              </div> */}
            </div>
          </header>

          {/* Task List */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-center mb-6">Tasks</h2>
            <div className="space-y-5">
              {filteredTasks.map((task, index) => (
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
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition duration-300 transform hover:scale-[1.01] border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
            statusStyles[task.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {task.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      <div className="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
        <div>
          📅 Start:{" "}
          {task.start_date ? formatDate(task.start_date) : "Not specified"}
        </div>
        <div>
          🗓️ Due: {task.end_date ? formatDate(task.end_date) : "Not specified"}
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
