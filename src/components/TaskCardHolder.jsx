import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteTask, fetchTasks } from "../services/TaskServices";
import { useRecoilValue } from "recoil";
import { ProjectState } from "../data/atom";
import TaskCard from "./TaskCard";
import { editProjectById, fetchProjectById } from "../services/ProjectServices";

const TaskCardHolder = ({ project_id, value, userRole }) => {
  const { projectId } = useParams();
  const fallbackProjectId = useRecoilValue(ProjectState);
  const activeProjectId = projectId || fallbackProjectId;

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);

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

        const fetchedTasks = await fetchTasks(project_id);
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
      isMounted = false;
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
      alert(
        "Project marked as completed! Please go to the Project Dashboard to see the changes!"
      );
    }
  };

  const handleEditClick = (taskId) => {
    console.log("Edit task with ID:", taskId);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTrigger((prev) => !prev);
      alert("The Task is Deleted Successfully");
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
    <div className="bg-red-400">
      {allTasksCompleted && (
        <div className="col-span-3 text-center p-4 bg-green-200 text-green-800 rounded-md">
          <p>🎉 All tasks are completed! 🎉</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleCompleteProject}
          >
            Mark Project as Completed
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-4 py-8 px-3 md:px-0 min-h-screen bg-gray-50">
        <TaskColumn
          userRole={userRole}
          title="Not Started"
          bg="bg-gradient-to-b from-red-500 to-red-400"
          tasks={notStartedTasks}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <TaskColumn
          userRole={userRole}
          title="In Progress"
          bg="bg-gradient-to-b from-blue-500 to-blue-400"
          tasks={inProgressTasks}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <TaskColumn
          userRole={userRole}
          title="Completed"
          bg="bg-gradient-to-b from-green-500 to-green-400"
          tasks={completedTasks}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default TaskCardHolder;

// 👇 Scrollable Column Component
const TaskColumn = ({
  title,
  bg,
  tasks,
  onEditClick,
  onDelete,
  onStatusChange,
  userRole,
}) => (
  <div
    className={`${bg} text-white p-4 rounded-md shadow-lg flex flex-col h-[80vh]`}
  >
    <h2 className="text-xl font-medium mb-4">{title}</h2>
    <div className="overflow-y-auto space-y-4 pr-2" style={{ flexGrow: 1 }}>
      {tasks.length === 0 ? (
        <p className="text-gray-200">No tasks to show</p>
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
            userRole={userRole}
          />
        ))
      )}
    </div>
  </div>
);
