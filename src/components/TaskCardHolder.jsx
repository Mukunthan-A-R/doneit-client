import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProjectState, refetchTriggerAtom, userData } from "../data/atom";
import useProject from "../hooks/useProject";
import { editProjectById } from "../services/ProjectServices";
import { deleteTask, fetchTasks } from "../services/TaskServices";
import { createActivityLog } from "../services/projectActivity";
import ProjectTitleCard from "./ProjectTitleCard";
import TaskCard from "./TaskCard";
import CreateTask from "./modals/CreateTask";
import ProjectCompletedToast from "./modals/ProjectCompletedToast";

const TaskCardHolder = ({ userRole }) => {
  const { projectId } = useParams();
  const fallbackProjectId = useRecoilValue(ProjectState);
  const activeProjectId = projectId || fallbackProjectId;
  const [showCreateTask, setShowCreateTask] = useState(false);

  const currentUserData = useRecoilValue(userData);
  const [refetchTrigger, setRefetchTrigger] =
    useRecoilState(refetchTriggerAtom);
  const currentUserId = currentUserData?.user_id;

  const { project } = useProject(projectId);

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

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

        const fetchedTasks = await fetchTasks(projectId);
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
  }, [activeProjectId, refetchTrigger]);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.task_id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const handleCompleteProject = async () => {
    const editData = {
      name: project?.name,
      description: project?.description,
      start_date: project?.start_date,
      end_date: project?.end_date,
      status: "completed",
      priority: project?.priority,
      created: project?.created,
    };
    const response = await editProjectById(fallbackProjectId, editData);
    if (response) {
      setShowToast(true);
    }
  };

  const handleEditClick = (taskId) => {
    console.log("Edit task with ID:", taskId);
  };

  const handleDelete = async (taskId, taskTitle) => {
    try {
      await deleteTask(taskId);
      setRefetchTrigger((prev) => prev + 1);
      alert("The Task is Deleted Successfully");

      // Log delete activity
      await createActivityLog({
        user_id: currentUserId,
        projectId: activeProjectId,
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
    <div className="flex flex-col gap-3">
      <ProjectTitleCard />
      <header className="bg-blue-950 text-white py-4 px-6  shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between my-4 mb-0 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold"> Task Tracker</h1>
      </header>
      {allTasksCompleted && (
        <div className="col-span-3 p-6 bg-green-50 border border-green-300 rounded-lg shadow-sm text-center transition-all duration-300 mt-4">
          <p className="text-green-800 text-lg font-semibold mb-4">
            🎉 All tasks are completed! 🎉
          </p>
          <button
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            onClick={handleCompleteProject}
          >
            ✅ Mark Project as Completed
          </button>
        </div>
      )}
      {/* Toast */}
      {showToast && (
        <ProjectCompletedToast
          show={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
      <button
        onClick={() => setShowCreateTask(true)}
        className="flex text-lg items-center justify-center p-2 hover:bg-blue-700 text-white rounded-md w-fit px-4 cursor-pointer bg-blue-400 transition duration-300"
      >
        <IoMdAddCircleOutline size={30} />
        Create Task
      </button>
      {showCreateTask && (
        <CreateTask
          onClose={() => setShowCreateTask(false)} // Close the modal
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-4 px-3 md:px-0 min-h-screen ">
        <TaskColumn
          userRole={userRole}
          title="Not Started"
          bg="bg-gradient-to-b from-red-500 to-red-400"
          tasks={notStartedTasks}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          projectStartDate={project?.start_date}
          projectEndDate={project?.end_date}
        />

        <TaskColumn
          userRole={userRole}
          title="In Progress"
          bg="bg-gradient-to-b from-blue-500 to-blue-400"
          tasks={inProgressTasks}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          projectStartDate={project?.start_date}
          projectEndDate={project?.end_date}
        />

        <TaskColumn
          userRole={userRole}
          title="Completed"
          bg="bg-gradient-to-b from-green-500 to-green-400"
          tasks={completedTasks}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          projectStartDate={project?.start_date}
          projectEndDate={project?.end_date}
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
  userRole = "",
  projectStartDate,
  projectEndDate,
}) => (
  <div className={`${bg} text-white p-4 rounded-md shadow-lg flex flex-col`}>
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
