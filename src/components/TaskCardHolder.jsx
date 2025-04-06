import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/TaskServices";
import { useRecoilValue } from "recoil";
import { ProjectState } from "../data/atom";
import TaskCard from "./TaskCard";

const TaskCardHolder = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const project_id = useRecoilValue(ProjectState);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("project_id", project_id); // Added log to check the project_id
        const fetchedTasks = await fetchTasks(project_id);

        console.log(fetchedTasks); // Debugging log for fetched tasks
        setTasks(fetchedTasks);
      } catch (err) {
        console.error(err);
        console.error("Error fetching tasks");
        setError(err.message);
      }
    };

    getData();
  }, [project_id]);

  // Separate tasks by status
  const notStartedTasks = tasks.filter((task) => task.status === "not started");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 h-screen overflow-y-auto">
      {/* Column 1 - Not Started */}
      <div className="bg-red-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Not Started</h2>
        {notStartedTasks.length === 0 ? (
          <p>No tasks to show</p>
        ) : (
          notStartedTasks.map((task) => (
            <TaskCard
              title={task.title}
              key={task.task_id}
              desc={task.description}
              task_id={task.task_id}
              status={task.status}
              startDate={task.start_date}
              endDate={task.end_date}
              timeDuration={task.time_duration}
            />
          ))
        )}
      </div>

      {/* Column 2 - In Progress */}
      <div className="bg-blue-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">In Progress</h2>
        {inProgressTasks.length === 0 ? (
          <p>No tasks to show</p>
        ) : (
          inProgressTasks.map((task) => (
            <TaskCard
              key={task.task_id}
              task_id={task.task_id}
              title={task.title}
              status={task.status}
              startDate={task.start_date}
              endDate={task.end_date}
              timeDuration={task.time_duration}
            />
          ))
        )}
      </div>

      {/* Column 3 - Completed */}
      <div className="bg-green-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Completed</h2>
        {completedTasks.length === 0 ? (
          <p>No tasks to show</p>
        ) : (
          completedTasks.map((task) => (
            <TaskCard
              key={task.task_id}
              task_id={task.task_id}
              title={task.title}
              status={task.status}
              startDate={task.start_date}
              endDate={task.end_date}
              timeDuration={task.time_duration}
            />
          ))
        )}
      </div>

      {/* Show error message if there was an error */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TaskCardHolder;
