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
        setTasks(fetchedTasks);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen flex">
      <div className={`lg:block w-1/6 bg-blue-900 p-4`}>
        <h2 className="text-white">Task Toolbar</h2>
        <TaskToolbar></TaskToolbar>
      </div>

      <div className="w-full lg:w-5/6 bg-white p-6">
        <h1 className="text-2xl font-semibold pb-4">Your Analytics !</h1>
        <div className="p-6 h-screen flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold mb-6">Task Status Analytics</h2>
          {/* If error, display error message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Render the PieChart component with tasks as a prop */}
          <PieChart tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
