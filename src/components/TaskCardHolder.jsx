import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/TaskServices";

const TaskCardHolder = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const project_id = 70;

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedTasks = await fetchTasks(project_id);
        console.log(fetchedTasks);
        setTasks(fetchedTasks);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    getData();
  }, [project_id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 h-screen overflow-y-auto">
      <div className="bg-red-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Column 1</h2>
        <p>Content for Column 1</p>
      </div>
      <div className="bg-blue-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Column 2</h2>
        <p>Content for Column 2</p>
      </div>
      <div className="bg-green-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Column 3</h2>
        <p>Content for Column 3</p>
      </div>
      {/* Render tasks or error if any */}
      {tasks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Fetched Tasks:</h3>
          <ul>
            {tasks.map((task) => (
              <li key={task.task_id}>{task.title}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}{" "}
    </div>
  );
};

export default TaskCardHolder;
