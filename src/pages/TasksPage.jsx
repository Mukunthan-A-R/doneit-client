import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ProjectState, tagUserReload, userData } from "../data/atom";
import { getCollaboratedProjects } from "../services/getCollaboratedProjects";
import { editProjectById } from "../services/ProjectServices";
import { toast } from "react-toastify";
import { deleteTask, updateTask } from "../services/TaskServices";
import { getAllAssignmentsByProject } from "../services/taskAssignmentService";
import { createActivityLog } from "../services/projectActivity";
import { IoMdAddCircleOutline } from "react-icons/io";

import useProjectTasks from "../hooks/useProjectTasks";
import useProject from "../hooks/useProject";
import ProjectTitleCard from "../components/ProjectTitleCard";
import CreateTask from "../components/modals/CreateTask";
import TaskCard from "../components/TaskCard";
import ErrorHandler from "../components/ErrorHandler";

export default function TasksPage() {
  const [userRole, setUserRole] = useState("");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [taskAssignments, setTaskAssignments] = useState({});
  const [taskViewMode, setTaskViewMode] = useState("all");

  const { user: currentUserData } = useRecoilValue(userData);
  const currentUserId = currentUserData.user_id;

  const { projectId } = useParams();
  const fallbackProjectId = useRecoilValue(ProjectState);
  const activeProjectId = projectId || fallbackProjectId;

  const taskTagRender = useRecoilValue(tagUserReload);

  const { project, refetch } = useProject(projectId);

  const {
    tasks,
    refetch: refetchTasks,
    isLoading,
    error,
  } = useProjectTasks(projectId);

  if (error) {
    console.log("error in task page");
    console.log(error);
  }

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

  useEffect(() => {
    const fetchTaskAssignments = async () => {
      try {
        const assignmentList = await getAllAssignmentsByProject(projectId);

        const map = {};
        assignmentList.forEach(
          ({ task_id, user_id, user_name, user_email }) => {
            if (!map[task_id]) map[task_id] = [];
            map[task_id].push({ user_id, name: user_name, email: user_email });
          }
        );

        setTaskAssignments(map);
      } catch (err) {
        console.error("Failed to load task assignments:", err);
      }
    };

    fetchTaskAssignments();
  }, [projectId, taskTagRender]);

  const handleStatusChange = () => {
    refetchTasks();
  };

  const handleProjectStatus = async () => {
    const editData = {
      name: project?.name,
      description: project?.description,
      start_date: project?.start_date,
      end_date: project?.end_date,
      status: "active",
      priority: project?.priority,
      created: project?.created,
    };
    try {
      const response = await editProjectById(activeProjectId, editData);
      if (response) {
        toast.success("Project marked as Active!");
      }
      refetch();
    } catch (err) {
      console.log(err);
    }
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
    try {
      const response = await editProjectById(activeProjectId, editData);
      if (response) {
        toast.success("Project marked as completed!");
      }
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = () => {
    refetchTasks();
  };

  const handleDelete = async (taskId, taskTitle) => {
    try {
      await deleteTask(taskId);
      refetchTasks();

      toast.success("Task Deleted Successfully!");
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

  const handleDrop = async (e, taskStatus) => {
    if (!isDraggable) return;
    const task_id = e.dataTransfer.getData("task_id");
    const currentTask = tasks.find((task) => task.task_id == task_id);
    if (!currentTask) return;
    if (currentTask.status === taskStatus) return;
    try {
      await updateTask(task_id, {
        project_id: projectId,
        status: taskStatus,
        title: currentTask.title,
        description: currentTask.description,
        start_date: currentTask.start_date,
        end_date: currentTask.end_date,
        time_duration: currentTask.time_duration,
      });
      refetchTasks(true);
      await createActivityLog({
        user_id: currentUserId,
        project_id: currentTask.project_id,
        task_id: task_id,
        action: "status-change",
        context: {
          oldStatus: currentTask.status,
          newStatus: taskStatus,
          title: currentTask.title,
        },
      });
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };

  const filteredTasks = useMemo(() => {
    if (taskViewMode === "tagged") {
      return tasks.filter((task) =>
        (taskAssignments[task.task_id] || []).some(
          (user) => user.user_id === currentUserId
        )
      );
    }
    return tasks;
  }, [tasks, taskAssignments, taskViewMode, currentUserId]);

  const taskCategories = useMemo(
    () => [
      {
        heading: "Not Started",
        bg: "bg-blue-900",
        name: "not started",
        items:
          !isLoading && filteredTasks?.length
            ? filteredTasks.filter((task) => task.status === "not started")
            : [],
      },
      {
        heading: "In progress",
        bg: "bg-yellow-600",
        name: "in progress",
        items:
          !isLoading && filteredTasks?.length
            ? filteredTasks.filter((task) => task.status === "in progress")
            : [],
      },
      {
        heading: "Completed",
        bg: "bg-green-600",
        name: "completed",
        items:
          !isLoading && filteredTasks?.length
            ? filteredTasks.filter((task) => task.status === "completed")
            : [],
      },
    ],
    [filteredTasks, isLoading]
  );

  if (!activeProjectId) {
    return (
      <p className="text-xl text-red-600">Please select a project first.</p>
    );
  }

  if (isLoading) {
    return <p className="text-blue-500">Loading tasks...</p>;
  }

  if (error && !isLoading) {
    return <ErrorHandler error={error} />;
  }

  const allTasksCompleted =
    tasks.length > 0 && tasks.length === taskCategories[2].items.length;

  return (
    <div className="flex flex-col gap-3">
      <ProjectTitleCard />
      <header className="bg-blue-950 text-white py-2 px-4  shadow rounded-lg flex items-center justify-between my-4 mb-0 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold">Task Tracker </h1>
        <div className="flex gap-10">
          <div className="relative">
            <button
              onClick={() =>
                setTaskViewMode((prev) => (prev === "all" ? "tagged" : "all"))
              }
              className={`flex items-center justify-center p-2 rounded-md w-fit px-4 cursor-pointer border transition duration-300 gap-2 transform hover:scale-105
    ${
      taskViewMode === "all"
        ? "text-white"
        : "bg-gray-100 text-gray-800 border-gray-500"
    }
  `}
            >
              {taskViewMode === "all"
                ? "Showing: All Tasks"
                : "Showing: My Tasks"}
            </button>
          </div>

          <button
            onClick={() => setShowCreateTask(true)}
            className="flex items-center justify-center p-2 text-white rounded-md w-fit px-4 cursor-pointer border border-white transition duration-300 gap-2 transform hover:scale-105"
          >
            <IoMdAddCircleOutline size={20} />
            Create Task
          </button>
        </div>
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
          {allTasksCompleted && project?.status === "completed" && (
            <ChangeProjectStatus handleProjectStatus={handleProjectStatus} />
          )}
          {allTasksCompleted && project?.status !== "completed" && (
            <AllTasksCompletedBanner
              handleCompleteProject={handleCompleteProject}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-4 md:px-0 min-h-screen">
            {/* Not Started column */}
            {taskCategories.map((category) => (
              <div
                className={`bg-gray-100 text-white p-4 rounded-lg  flex flex-col`}
                key={category.heading}
                onDrop={(e) => handleDrop(e, category.name)}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
              >
                <div
                  className={`${category.bg} py-2 px-4 rounded-xl flex justify-between items-center`}
                >
                  <h2 className="text-xl font-semibold text-white">
                    {category.heading}
                  </h2>
                  <p>{category.items.length}</p>
                </div>
                <div
                  className="overflow-y-auto space-y-4 pr-2"
                  style={{ flexGrow: 1 }}
                >
                  {category.items.length === 0 ? (
                    <p className="text-gray-800 pt-4 pl-4 font-medium">
                      No tasks to show
                    </p>
                  ) : (
                    category.items.map((task) => (
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
                        assignedUsers={taskAssignments[task.task_id] || []}
                        onEditClick={handleEditClick}
                        onhandleDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                        userRole={userRole}
                        isDraggable={isDraggable}
                        onDragStart={(e) => {
                          if (!isDraggable) return;
                          e.dataTransfer.setData("task_id", task.task_id);
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        onDragEnd={(e) => {
                          if (!isDraggable) return;
                          e.dataTransfer.setData("task_id", null);
                        }}
                        onMouseDown={() => {
                          setIsDraggable(true);
                        }}
                        onMouseLeave={() => {
                          setIsDraggable(false);
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
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

function ChangeProjectStatus({ handleProjectStatus }) {
  return (
    <div className="col-span-3 p-8 bg-white dark:bg-blue-950 border border-blue-800 rounded-2xl shadow-xl transition-all duration-300 mt-6">
      <p className="text-gray-900 dark:text-white text-2xl font-semibold mb-4 text-center">
        Do you want to change the project status?
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleProjectStatus}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-base font-semibold rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          Mark Project as Active
        </button>
      </div>
    </div>
  );
}
