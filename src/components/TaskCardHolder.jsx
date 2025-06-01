import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteTask, fetchTasks } from "../services/TaskServices";
import { useRecoilValue } from "recoil";
import { ProjectState, userData } from "../data/atom";
import TaskCard from "./TaskCard";
import { editProjectById, fetchProjectById } from "../services/ProjectServices";
import { createActivityLog } from "../services/projectActivity";

const TaskCardHolder = ({ project_id, value, userRole }) => {
  const { projectId } = useParams();
  const fallbackProjectId = useRecoilValue(ProjectState);
  const activeProjectId = projectId || fallbackProjectId;

  const currentUserData = useRecoilValue(userData);
  const currentUserId = currentUserData?.user_id;

  const [project, setProject] = useState({
    created: 0,
    description: "",
    end_date: "2025-01-01T00:00:00.000Z",
    name: "",
    priority: "",
    project_id: 58,
    start_date: "2025-01-01T00:00:00.000Z",
    status: "",
  });
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
        setError(err.message);

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

  useEffect(() => {
    const getProject = async (project_id) => {
      if (project_id) {
        try {
          const { data } = await fetchProjectById(project_id);
          setProject(data);
        } catch (err) {
          setError(err);
        }
      }
    };

    getProject(project_id);
  }, []);

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

  const handleDelete = async (taskId, taskTitle) => {
    try {
      await deleteTask(taskId);
      setTrigger((prev) => !prev);
      alert("The Task is Deleted Successfully");

      // Log delete activity
      await createActivityLog({
        user_id: currentUserId,
        project_id: activeProjectId,
        task_id: taskId,
        action: "delete",
        context: {
          title: taskTitle,
        },
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // const handleDelete = async (taskId) => {
  //   try {
  //     await deleteTask(taskId);
  //     setTrigger((prev) => !prev);
  //     alert("The Task is Deleted Successfully");
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };

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

  if (error === "Access denied") {
    return <p className="text-red-500">Access Forbidden ! URL not found !</p>;
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
      <div className="flex flex-col sm:flex-row  gap-2 mt-8 lg:mt-0">
        <h2 className="text-2xl font-medium ">{project.name}</h2>
        <span className="flex gap-2">
          <p className="mt-2">
            ( {formatDate(project.start_date)} to {formatDate(project.end_date)}{" "}
            )
          </p>
          <p className="font-medium flex items-center mt-2">
            <span
              className={` px-2 py-1 rounded-full text-white text-xs font-semibold ${
                project.priority === "low"
                  ? "bg-green-500"
                  : project.priority === "medium"
                  ? "bg-orange-500"
                  : "bg-red-500"
              }`}
            >
              {project.priority}
            </span>
          </p>
        </span>
      </div>
      <p className="font-medium">Description : {project.description}</p>
      <p className="font-medium"> Status : {project.status}</p>

      <header className="bg-blue-950 text-white py-4 px-6  shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between my-4 mb-0 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold"> Task Tracker</h1>
      </header>

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
          projectStartDate={project.start_date}
          projectEndDate={project.end_date}
        />

        <TaskColumn
          userRole={userRole}
          title="In Progress"
          bg="bg-gradient-to-b from-blue-500 to-blue-400"
          tasks={inProgressTasks}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          projectStartDate={project.start_date}
          projectEndDate={project.end_date}
        />

        <TaskColumn
          userRole={userRole}
          title="Completed"
          bg="bg-gradient-to-b from-green-500 to-green-400"
          tasks={completedTasks}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          projectStartDate={project.start_date}
          projectEndDate={project.end_date}
        />
      </div>
    </>
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
  userRole = "",
  projectStartDate,
  projectEndDate,
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
            projectStartDate={projectStartDate}
            projectEndDate={projectEndDate}
          />
        ))
      )}
    </div>
  </div>
);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};
