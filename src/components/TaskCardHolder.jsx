import React, { useEffect, useState } from "react";
import { deleteTask, fetchTasks } from "../services/TaskServices";
import { useRecoilValue } from "recoil";
import { ProjectState } from "../data/atom";
import TaskCard from "./TaskCard";

const TaskCardHolder = ({ value }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const project_id = useRecoilValue(ProjectState);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        setLoading(true);
        if (project_id === null) {
          setTasks([]); // Clear tasks if no project selected
          setLoading(false);
          return;
        }

        // Add cache-busting param
        const fetchedTasks = await fetchTasks(`${project_id}?_=${Date.now()}`);
        if (isMounted) {
          setTasks(fetchedTasks.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getData();

    return () => {
      // Cleanup state on unmount
      isMounted = false;
      setTasks([]);
      setError(null);
      setLoading(true);
    };
  }, [project_id, trigger, value]);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.task_id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleEditClick = (taskId) => {
    deleteTask(taskId); // Consider separating edit vs delete!
    console.log("Edit task with ID:", taskId);
  };

  const handleDelete = async (taskId) => {
    try {
      const deletedTask = await deleteTask(taskId);
      console.log("Task deleted:", deletedTask);
      setTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Categorize tasks
  const notStartedTasks = tasks.filter((task) => task.status === "not started");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  // UI rendering logic
  if (project_id === null) {
    return <p className="text-xl text-red-600">Please select a project first</p>;
  }

  if (loading) {
    return <p className="text-blue-500">Loading tasks...</p>;
  }

  if (!loading && tasks.length === 0) {
    return <p className="text-gray-600">Please create a task to get started!</p>;
  }

  if (error) {
    return (
      <p className="text-red-600">
        An error occurred: {error}. Please try refreshing the page.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 h-screen overflow-y-auto">
      {/* Not Started Tasks */}
      <div className="bg-red-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Not Started</h2>
        {notStartedTasks.length === 0 ? (
          <p>No tasks to show</p>
        ) : (
          notStartedTasks.map((task) => (
            <TaskCard
              key={task.task_id}
              {...task}
              onEditClick={handleEditClick}
              onhandleDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>

      {/* In Progress Tasks */}
      <div className="bg-blue-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">In Progress</h2>
        {inProgressTasks.length === 0 ? (
          <p>No tasks to show</p>
        ) : (
          inProgressTasks.map((task) => (
            <TaskCard
              key={task.task_id}
              {...task}
              onEditClick={handleEditClick}
              onhandleDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>

      {/* Completed Tasks */}
      <div className="bg-green-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Completed</h2>
        {completedTasks.length === 0 ? (
          <p>No tasks to show</p>
        ) : (
          completedTasks.map((task) => (
            <TaskCard
              key={task.task_id}
              {...task}
              onEditClick={handleEditClick}
              onhandleDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskCardHolder;
