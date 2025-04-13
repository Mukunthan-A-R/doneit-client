import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/TaskServices";
import PieChart from "../components/PieChart"; // Import PieChart Component
import TaskToolbar from "../components/TaskToolbar";
import { useRecoilValue } from "recoil";
import { ProjectState } from "../data/atom";

const Analytics = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const currentProject = useRecoilValue(ProjectState);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedTasks = await fetchTasks(currentProject);
        setTasks(fetchedTasks.data);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, [currentProject]);

  // Count tasks by status
  const countTasksByStatus = () => {
    const counts = {
      remaining: 0,
      completed: 0,
      notStarted: 0,
    };

    tasks.forEach((task) => {
      if (task.status === "not started") {
        counts.notStarted += 1;
      } else if (task.status === "in progress" || task.status === "pending") {
        counts.remaining += 1;
      } else if (task.status === "completed") {
        counts.completed += 1;
      }
    });

    return counts;
  };

  const { remaining, completed, notStarted } = countTasksByStatus();

  // Calculate completion percentage
  const totalTasks = tasks.length;
  const completionPercentage =
    totalTasks > 0 ? (completed / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar - Task Toolbar */}
      <div className="lg:w-2/12 w-full bg-blue-900 p-4">
        <h2 className="text-white">Task Toolbar</h2>
        <TaskToolbar />
      </div>

      {/* Right Side - Pie Chart and Stats */}
      <div className="w-full lg:w-10/12 bg-gray-50 p-6 flex flex-col lg:flex-row justify-between items-center">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          {/* Render the PieChart component with tasks as a prop */}
          <div className="bg-white shadow-xl p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Task Status Analytics
            </h2>
            <PieChart tasks={tasks} />
          </div>
        </div>

        {/* Task Stats */}
        <div className="lg:w-1/3 w-full flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Task Statistics
          </h2>
          <div className="space-y-4 w-full">
            {/* Task Status Cards */}
            <div className="bg-green-100 text-center py-4 px-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-green-800">
                Remaining Tasks
              </h3>
              <p className="text-2xl font-bold text-green-600">{remaining}</p>
            </div>
            <div className="bg-blue-100 text-center py-4 px-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-blue-800">
                Completed Tasks
              </h3>
              <p className="text-2xl font-bold text-blue-600">{completed}</p>
            </div>
            <div className="bg-yellow-100 text-center py-4 px-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-yellow-800">
                Not Started Tasks
              </h3>
              <p className="text-2xl font-bold text-yellow-600">{notStarted}</p>
            </div>

            {/* Task Completion Percentage */}
            <div className="bg-purple-100 text-center py-4 px-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-purple-800">
                Task Completion Percentage
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                {completionPercentage.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Additional Stats - Optional */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Overall Stats
            </h3>
            <table className="table-auto w-full mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">Metric</th>
                  <th className="px-4 py-2 text-left text-gray-600">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">Total Tasks</td>
                  <td className="px-4 py-2">{totalTasks}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Completed Tasks</td>
                  <td className="px-4 py-2">{completed}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Remaining Tasks</td>
                  <td className="px-4 py-2">{remaining}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Not Started Tasks</td>
                  <td className="px-4 py-2">{notStarted}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
