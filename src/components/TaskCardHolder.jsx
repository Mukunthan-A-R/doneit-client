import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteTask, fetchTasks } from "../services/TaskServices";
import { useRecoilValue } from "recoil";
import { ProjectState } from "../data/atom";
import TaskCard from "./TaskCard";
import { editProjectById, fetchProjectById } from "../services/ProjectServices";

const TaskCardHolder = ({ value }) => {
  const { projectId } = useParams();
  const fallbackProjectId = useRecoilValue(ProjectState);
  const activeProjectId = projectId || fallbackProjectId;

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);

  // This is the cleanup function inside the useEffect
  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        setLoading(true);
        if (!activeProjectId) {
          setTasks([]);
          setLoading(false);
          return;
        }

        const fetchedTasks = await fetchTasks(
          `${activeProjectId}?_=${Date.now()}`
        );
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

    // Cleanup function when component unmounts
    return () => {
      isMounted = false;
      // You can add any cleanup logic here
      console.log("Component is unmounting, cleanup happening...");
      setTasks([]);
      setError(null);
      setLoading(false);
    };
  }, [activeProjectId, trigger, value]);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.task_id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleCompleteProject = async () => {
    const result = await fetchProjectById(fallbackProjectId);
    const editData = {
      name: result.data.name,
      description: result.data.description,
      start_date: result.data.start_date,
      end_date: result.data.end_date,
      status: "completed",
      priority: result.data.priority,
      created: result.data.created,
    };
    const response = await editProjectById(fallbackProjectId, editData);
    if (response) {
      alert("Project marked as completed !");
    }
  };

  const handleEditClick = (taskId) => {
    console.log("Edit task with ID:", taskId);
    // navigate to edit page or trigger modal
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTrigger((prev) => !prev); // triggers refetch
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const notStartedTasks = tasks.filter((task) => task.status === "not started");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const allTasksCompleted =
    tasks.length > 0 && tasks.length === completedTasks.length;

  if (!activeProjectId) {
    return (
      <p className="text-xl text-red-600">Please select a project first.</p>
    );
  }

  if (loading) {
    return <p className="text-blue-500">Loading tasks...</p>;
  }

  if (!loading && tasks.length === 0) {
    return (
      <p className="text-gray-600">Please create a task to get started!</p>
    );
  }

  if (error) {
    return <p className="text-red-600">An error occurred: {error}</p>;
  }

  return (
    <>
      {allTasksCompleted && (
        <div className="col-span-3 text-center p-2 bg-green-100 text-green-800 rounded-md shadow-md">
          <p>🎉 All tasks are completed! Great job! 🎉</p>
          <button
            className="text-blue-700 hover:underline"
            onClick={handleCompleteProject}
          >
            Mark Project as Completed !
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 h-screen overflow-y-auto">
        {/* Not Started Tasks */}
        <TaskColumn
          title="Not Started"
          bg="bg-red-500"
          tasks={notStartedTasks}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        {/* In Progress Tasks */}
        <TaskColumn
          title="In Progress"
          bg="bg-blue-500"
          tasks={inProgressTasks}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        {/* Completed Tasks */}
        <TaskColumn
          title="Completed"
          bg="bg-green-500"
          tasks={completedTasks}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>
    </>
  );
};

export default TaskCardHolder;

// Helper Component
const TaskColumn = ({
  title,
  bg,
  tasks,
  onEditClick,
  onDelete,
  onStatusChange,
}) => (
  <div className={`${bg} text-white p-6 rounded-lg`}>
    <h2 className="text-xl font-semibold">{title}</h2>
    {tasks.length === 0 ? (
      <p>No tasks to show</p>
    ) : (
      tasks.map((task) => (
        <TaskCard
          key={task.task_id}
          task_id={task.task_id}
          title={task.title}
          status={task.status}
          desc={task.description}
          startDate={task.start_date}
          endDate={task.end_date}
          timeDuration={task.time_duration}
          project_id={task.project_id}
          onEditClick={onEditClick}
          onhandleDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))
    )}
  </div>
);
