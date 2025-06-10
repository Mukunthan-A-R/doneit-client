import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { ProjectState, userData } from "../data/atom";
import useProject from "../hooks/useProject";
import useProjectTasks from "../hooks/useProjectTasks";
import { editProjectById } from "../services/ProjectServices";
import { deleteTask } from "../services/TaskServices";
import { createActivityLog } from "../services/projectActivity";
import ProjectTitleCard from "./ProjectTitleCard";
import TaskCard from "./TaskCard";
import CreateTask from "./modals/CreateTask";
import ErrorHandler from "./ErrorHandler";

const TaskCardHolder = ({ userRole }) => {
  const { projectId } = useParams();
  const fallbackProjectId = useRecoilValue(ProjectState);
  const activeProjectId = projectId || fallbackProjectId;
  const [showCreateTask, setShowCreateTask] = useState(false);

  const currentUserData = useRecoilValue(userData);
  const currentUserId = currentUserData?.user_id;

  const { project } = useProject(projectId);
  const {
    tasks,
    refetch: refetchTasks,
    isLoading,
    error,
  } = useProjectTasks(projectId);
  console.log(tasks, isLoading, error, typeof error);

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

  const notStartedTasks = tasks?.filter(
    (task) => task.status === "not started",
  );
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in progress",
  );
  const completedTasks = tasks?.filter((task) => task.status === "completed");

  const allTasksCompleted =
    tasks?.length > 0 && tasks?.length === completedTasks?.length;

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
      <button onClick={refetchTasks}>trigger refetch</button>
      {showCreateTask && (
        <CreateTask
          onClose={() => setShowCreateTask(false)} // Close the modal
        />
      )}
      {!isLoading && tasks?.length === 0 ? (
        <p>No tasks have been created.</p>
      ) : (
        <>
          {allTasksCompleted && (
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
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-4 md:px-0 min-h-screen">
            <TaskColumn
              userRole={userRole}
              title="Not Started"
              bg="bg-blue-900"
              tasks={notStartedTasks}
              count={notStartedTasks?.length}
              onEditClick={handleEditClick}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              projectStartDate={project?.start_date}
              projectEndDate={project?.end_date}
            />

            <TaskColumn
              userRole={userRole}
              title="In Progress"
              bg="bg-[#deaf14]"
              tasks={inProgressTasks}
              count={inProgressTasks.length}
              onEditClick={handleEditClick}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              projectStartDate={project?.start_date}
              projectEndDate={project?.end_date}
            />

            <TaskColumn
              userRole={userRole}
              title="Completed"
              bg="bg-green-600"
              tasks={completedTasks}
              count={completedTasks.length}
              onEditClick={handleEditClick}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              projectStartDate={project?.start_date}
              projectEndDate={project?.end_date}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCardHolder;

// 👇 Scrollable Column Component
const TaskColumn = ({
  title,
  bg,
  tasks,
  count,
  onEditClick,
  onDelete,
  onStatusChange,
  userRole = "",
  projectStartDate,
  projectEndDate,
}) => (
  <div className={`bg-gray-100 text-white p-4 rounded-lg  flex flex-col`}>
    <div
      className={`${bg} py-2 px-4 rounded-xl flex justify-between items-center`}
    >
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p>{count}</p>
    </div>
    <div className="overflow-y-auto space-y-4 pr-2" style={{ flexGrow: 1 }}>
      {tasks.length === 0 ? (
        <p className="text-gray-800 pt-4 pl-4 font-medium">No tasks to show</p>
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
