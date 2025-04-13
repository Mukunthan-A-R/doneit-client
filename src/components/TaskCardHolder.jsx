import React, { useEffect, useState } from "react";
import { deleteTask, fetchTasks } from "../services/TaskServices";
import { useRecoilValue } from "recoil";
import { ProjectState } from "../data/atom";
import TaskCard from "./TaskCard";

const TaskCardHolder = ({ value }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const project_id = useRecoilValue(ProjectState);
  const [trigger, setTrigger] = useState(false);

  console.log(project_id);

  useEffect(() => {
    const getData = async () => {
      try {
        if (project_id === null) {
          return;
        }
        const fetchedTasks = await fetchTasks(project_id);
        setTasks(fetchedTasks.data);
        console.log(fetchedTasks.data);
        
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, [project_id, trigger, value]);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.task_id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleEditClick = (taskId) => {
    deleteTask(taskId);
    console.log("Edit task with ID:", taskId);
    // You can implement a modal or navigate to an edit page
  };

  const handleDelete = async (taskId) => {
    try {
      const deletedTask = await deleteTask(taskId);
      console.log("Task deleted:", deletedTask);
      console.log("Delete action completed for task ID:", taskId);
      setTrigger(!trigger);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Separate tasks by status
  const notStartedTasks = tasks.filter((task) => task.status === "not started");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  if (project_id === null) {
    return (
      <p className="text-xl text-red-600">Please select a project first</p>
    );
  }

  if (tasks.length === 0) {
    return <p>Please Create a Task to work !</p>;
  }

  if (error && parseInt(error.status) === 404) {
    return <p>Error Occured Pls try refreshing the page !</p>;
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
              task_id={task.task_id}
              title={task.title}
              status={task.status}
              desc={task.description}
              startDate={task.start_date}
              endDate={task.end_date}
              timeDuration={task.time_duration}
              project_id={task.project_id} // Ensure project_id is passed here
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
              task_id={task.task_id}
              title={task.title}
              status={task.status}
              desc={task.description}
              startDate={task.start_date}
              endDate={task.end_date}
              timeDuration={task.time_duration}
              project_id={task.project_id} // Ensure project_id is passed here
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
              task_id={task.task_id}
              title={task.title}
              status={task.status}
              desc={task.description}
              startDate={task.start_date}
              endDate={task.end_date}
              timeDuration={task.time_duration}
              project_id={task.project_id} // Ensure project_id is passed here
              onEditClick={handleEditClick}
              onhandleDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>

      {/* Show error message if there was an error */}
      {/* {error && <p className="text-red-500">{error}</p>} */}
    </div>
  );
};

export default TaskCardHolder;
