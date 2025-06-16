import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ProjectState, userData } from "../data/atom";
import { getCollaboratedProjects } from "../services/getCollaboratedProjects";
import { editProjectById } from "../services/ProjectServices";
import { toast } from "react-toastify";
import { deleteTask } from "../services/TaskServices";
import { createActivityLog } from "../services/projectActivity";
import useProjectTasks from "../hooks/useProjectTasks";
import useProject from "../hooks/useProject";
import { IoMdAddCircleOutline } from "react-icons/io";
import ProjectTitleCard from "../components/ProjectTitleCard";
import CreateTask from "../components/modals/CreateTask";
import TaskCard from "../components/TaskCard";

export default function TasksPage() {
  const [userRole, setUserRole] = useState("");
  const currentUserData = useRecoilValue(userData);

  const { projectId } = useParams();

  const currentUserId = currentUserData.user_id;

  const fallbackProjectId = useRecoilValue(ProjectState);
  const activeProjectId = projectId || fallbackProjectId;
  const [showCreateTask, setShowCreateTask] = useState(false);
  const { project } = useProject(projectId);
  const {
    tasks,
    refetch: refetchTasks,
    isLoading,
    error,
  } = useProjectTasks(projectId);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getCollaboratedProjects(currentUserId);
        const project = data.find((p) => p.project_id === parseInt(projectId));
        if (project) {
          setUserRole(project.role);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log("No data");
        } else {
          console.log(err.message);
        }
      }
    };

    if (currentUserId) fetchProjects();
  }, [currentUserId]);

  const handleStatusChange = () => {
    refetchTasks();
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
      toast.success("Project marked as completed!");
    }
  };

  const handleEditClick = (taskId) => {
    console.log("Edit task with ID:", taskId);
    refetchTasks();
  };

  const handleDelete = async (taskId, taskTitle) => {
    try {
      await deleteTask(taskId);
      refetchTasks();

      toast.success("Task Deleted Successfully!");

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

  if (!activeProjectId) {
    return (
      <p className="text-xl text-red-600">Please select a project first.</p>
    );
  }

  if (isLoading) {
    return <p className="text-blue-500">Loading tasks...</p>;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  const notStartedTasks = tasks.filter((task) => task.status === "not started");

  const inProgressTasks = tasks.filter((task) => task.status === "in progress");

  const completedTasks = tasks.filter((task) => task.status === "completed");

  const allTasksCompleted =
    tasks.length > 0 && tasks.length === completedTasks.length;

  return (
    <div className="flex flex-col gap-3">
      <ProjectTitleCard />
      <header className="bg-blue-950 text-white py-2 px-4  shadow rounded-lg flex items-center justify-between my-4 mb-0 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold">Task Tracker </h1>
        <button
          onClick={() => setShowCreateTask(true)}
          className="flex items-center justify-center p-2 text-white rounded-md w-fit px-4 cursor-pointer border border-white transition duration-300 gap-2 transform hover:scale-105"
        >
          <IoMdAddCircleOutline size={20} />
          Create Task
        </button>
      </header>

      {/* Create task modal */}
      {showCreateTask && (
        <CreateTask
          refetchTasks={refetchTasks}
          onClose={() => setShowCreateTask(false)} // Close the modal
        />
      )}

      {!isLoading && tasks.length === 0 ? (
        <p className="flex flex-col justtify-center items-center p-40 text-green-800 text-lg sm:text-xl">
          New project created! Let’s add your first task to get things moving.
        </p>
      ) : (
        <>
          {allTasksCompleted && (
            <AllTasksCompletedBanner
              handleCompleteProject={handleCompleteProject}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-4 md:px-0 min-h-screen">
            {/* Not Started column */}
            <div
              className={`bg-gray-100 text-white p-4 rounded-lg  flex flex-col`}
            >
              <div
                className={`bg-blue-900 py-2 px-4 rounded-xl flex justify-between items-center`}
              >
                <h2 className="text-xl font-semibold text-white">
                  Not Started
                </h2>
                <p>{notStartedTasks.length}</p>
              </div>
              <div
                className="overflow-y-auto space-y-4 pr-2"
                style={{ flexGrow: 1 }}
              >
                {notStartedTasks.length === 0 ? (
                  <p className="text-gray-800 pt-4 pl-4 font-medium">
                    No tasks to show
                  </p>
                ) : (
                  notStartedTasks.map((task) => (
                    <TaskCard
                      key={task.task_id}
                      task_id={task.task_id}
                      title={task.title}
                      status={task.status}
                      profile={task.profile_img}
                      name={task.name}
                      desc={task.description}
                      startDate={task.start_date}
                      endDate={task.end_date}
                      timeDuration={task.time_duration}
                      onEditClick={handleEditClick}
                      onhandleDelete={handleDelete}
                      onStatusChange={handleStatusChange}
                      userRole={userRole}
                    />
                  ))
                )}
              </div>
            </div>
            {/* In Progress column */}
            <div
              className={`bg-gray-100 text-white p-4 rounded-lg  flex flex-col`}
            >
              <div
                className={`bg-[#deaf14] py-2 px-4 rounded-xl flex justify-between items-center`}
              >
                <h2 className="text-xl font-semibold text-white">
                  In progress
                </h2>
                <p>{notStartedTasks.length}</p>
              </div>
              <div
                className="overflow-y-auto space-y-4 pr-2"
                style={{ flexGrow: 1 }}
              >
                {inProgressTasks.length === 0 ? (
                  <p className="text-gray-800 pt-4 pl-4 font-medium">
                    No tasks to show
                  </p>
                ) : (
                  inProgressTasks.map((task) => (
                    <TaskCard
                      key={task.task_id}
                      task_id={task.task_id}
                      title={task.title}
                      status={task.status}
                      profile={task.profile_img}
                      name={task.name}
                      desc={task.description}
                      startDate={task.start_date}
                      endDate={task.end_date}
                      timeDuration={task.time_duration}
                      onEditClick={handleEditClick}
                      onhandleDelete={handleDelete}
                      onStatusChange={handleStatusChange}
                      userRole={userRole}
                    />
                  ))
                )}
              </div>
            </div>
            {/* In Progress column */}
            <div
              className={`bg-gray-100 text-white p-4 rounded-lg  flex flex-col`}
            >
              <div
                className={`bg-green-600 py-2 px-4 rounded-xl flex justify-between items-center`}
              >
                <h2 className="text-xl font-semibold text-white">Completed</h2>
                <p>{completedTasks.length}</p>
              </div>
              <div
                className="overflow-y-auto space-y-4 pr-2"
                style={{ flexGrow: 1 }}
              >
                {completedTasks.length === 0 ? (
                  <p className="text-gray-800 pt-4 pl-4 font-medium">
                    No tasks to show
                  </p>
                ) : (
                  completedTasks.map((task) => (
                    <TaskCard
                      key={task.task_id}
                      task_id={task.task_id}
                      title={task.title}
                      status={task.status}
                      profile={task.profile_img}
                      name={task.name}
                      desc={task.description}
                      startDate={task.start_date}
                      endDate={task.end_date}
                      timeDuration={task.time_duration}
                      onEditClick={handleEditClick}
                      onhandleDelete={handleDelete}
                      onStatusChange={handleStatusChange}
                      userRole={userRole}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AllTasksCompletedBanner({ handleCompleteProject }) {
  return (
    <div className="col-span-3 p-6 bg-blue-900 border border-blue-700 rounded-xl shadow-lg text-center transition-all duration-300 mt-4">
      <p className="text-white text-xl font-semibold mb-4 flex items-center justify-center gap-2">
        🎉 All tasks are completed!
      </p>
      <button
        onClick={handleCompleteProject}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-base font-medium rounded-md shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
      >
        Mark Project as Completed
      </button>
    </div>
  );
}
