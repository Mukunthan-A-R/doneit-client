import { useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { RiDragMove2Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { CurrentProjectState, userData } from "../data/atom";
import useClickOutside from "../hooks/useClickOutside";
import { updateTask } from "../services/TaskServices";
import { createActivityLog } from "../services/projectActivity";
import { formatDate } from "../services/utils";
import UserBadge from "./UserBadge";

const TaskCard = ({
  task_id,
  title,
  name,
  profile,
  status,
  desc,
  startDate,
  endDate,
  timeDuration,
  onEditClick,
  onhandleDelete,
  onStatusChange,
  isDraggable,
  onDragStart,
  onDragEnd,
  onMouseDown,
  onMouseLeave,
  userRole,
}) => {
  const { user: currentUserData } = useRecoilValue(userData);
  const currentUserId = currentUserData?.user_id;

  const remainingTime = calculateRemainingTime(endDate);
  const endTime = formatDate(endDate);
  const startTime = formatDate(startDate);

  const { projectId } = useParams();
  const { project, isLoading } = useRecoilValue(CurrentProjectState);

  const [menuVisible, setMenuVisible] = useState(false);
  const cardClickOutside = useClickOutside(() => setMenuVisible(false));
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    status: "",
    time_duration: "",
    start_date: "",
    end_date: "",
  });

  const formatInputDate = (dateStr) => {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState({
    title,
    status,
    description: desc,
    start_date: formatInputDate(startDate),
    end_date: formatInputDate(endDate),
    time_duration: timeDuration,
  });

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleStatusChange = async (newStatus) => {
    const updatedTaskData = {
      project_id: projectId,
      status: newStatus,
      title,
      description: desc,
      start_date: startDate,
      end_date: endDate,
      time_duration: timeDuration,
    };
    try {
      await updateTask(task_id, updatedTaskData);

      console.log("updatedTaskData");
      console.log(updatedTaskData);

      await createActivityLog({
        user_id: currentUserId,
        project_id: updatedTaskData.project_id,
        task_id: task_id,
        action: "status-change",
        context: {
          oldStatus: status,
          newStatus: updatedTaskData.status,
          title: updatedTaskData.title,
        },
      });

      toast.success("Status updated successfully!");
      onStatusChange(task_id, newStatus);
    } catch (err) {
      console.error("Failed to update task status", err);
    }
    setMenuVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {
      title: "",
      description: "",
      status: "",
      time_duration: "",
      start_date: "",
      end_date: "",
    };

    if (formData.title.trim() === "" || formData.title.length < 5) {
      newErrors.title = "Title is required and must be at least 5 characters.";
      formIsValid = false;
    }

    if (formData.description.trim() === "" || formData.description.length < 5) {
      newErrors.description =
        "Description is required and must be at least 5 characters.";
      formIsValid = false;
    }

    if (
      parseInt(formData.time_duration) <= 0 ||
      parseInt(formData.time_duration) > 24
    ) {
      newErrors.time_duration =
        "Working hours per day must be greater than 0 and less than 24.";
      formIsValid = false;
    }

    if (formData.start_date.trim() === "") {
      newErrors.start_date = "Start date is required.";
      formIsValid = false;
    }

    if (formData.end_date.trim() === "") {
      newErrors.end_date = "End date is required.";
      formIsValid = false;
    }

    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      newErrors.end_date = "End date must be later than start date.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const updatedTaskData = {
        ...formData,
        project_id: projectId,
      };
      await updateTask(task_id, updatedTaskData);

      await createActivityLog({
        user_id: currentUserId,
        project_id: updatedTaskData.project_id,
        task_id: task_id,
        action: "update",
        context: {
          field: "title",
          // newValue: updatedTaskData.title, // get the new value from formData or updatedTaskData
          title: updatedTaskData.title,
        },
      });

      toast.success("Task updated successfully!");
      onEditClick(updatedTaskData);
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task!");
    } finally {
      // window.location.reload();
    }
  };

  if (isLoading) return null;

  return (
    <div
      className="p-4 ml-1 my-4 animate-fade-in bg-white rounded-2xl outline-gray-200 outline-1 shadow-lg relative"
      draggable={isDraggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {/* 3-Dot Menu */}
      {userRole !== "client" && (
        <div className="absolute top-2 right-2">
          <button
            className="text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 grid place-items-center text-[10px] font-bold p-1 size-8"
            ref={cardClickOutside}
            onClick={toggleMenu}
          >
            •••
          </button>

          {menuVisible && (
            <div
              className="absolute border border-gray-200 bg-white shadow-xl rounded-lg *:hover:bg-blue-600 *:hover:text-white *:rounded-md mt-2 w-32 p-1 z-50 animate-fade-in"
              style={{
                left: "auto",
                right: "0",
                top: "100%",
                transform: "translateX(-10%)",
              }}
            >
              {status !== "not started" && (
                <button
                  className="flex gap-1 items-center w-full text-left px-2 py-1 text-sm text-gray-700"
                  onClick={() => handleStatusChange("not started")}
                >
                  <div className="size-3 rounded-full bg-blue-900" />
                  Not Started
                </button>
              )}
              {status !== "in progress" && (
                <button
                  className="flex gap-1 items-center w-full text-left px-2 py-1 text-sm text-gray-700"
                  onClick={() => handleStatusChange("in progress")}
                >
                  <div className="size-3 rounded-full bg-amber-500" />
                  In Progress
                </button>
              )}
              {status !== "completed" && (
                <button
                  className="flex gap-1 items-center w-full text-left px-2 py-1 text-sm text-gray-700"
                  onClick={() => handleStatusChange("completed")}
                >
                  <div className="size-3 rounded-full bg-green-600" />
                  Completed
                </button>
              )}
              <button
                className="flex gap-1 items-center w-full text-left px-2 py-1 text-sm text-gray-700"
                onClick={() => setIsEditPopupVisible(true)}
              >
                <BiPencil />
                Edit
              </button>
              <button
                className="flex gap-1 items-center w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-red-500!"
                onClick={() => onhandleDelete(task_id, title)}
              >
                <BiTrash />
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      <button
        className="text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 grid place-items-center text-[10px] font-bold p-1 size-8 absolute bottom-1 right-1"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
      >
        <RiDragMove2Fill size={20} />
      </button>

      {/* Task Info */}
      {name && <UserBadge profile={profile} name={name} />}
      <h3 className="text-xl text-gray-700 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 pb-3">{desc}</p>
      <p className="text-sm text-gray-600">Start Date: {startTime}</p>
      <p className="text-sm text-gray-600">End Date: {endTime}</p>
      <p className="text-sm text-gray-600">Work Hours: {timeDuration} hrs</p>
      {remainingTime.timeOver === false ? (
        <span className="flex gap-1 text-sm text-gray-600">
          <p>{remainingTime.message}:</p>
          <p>{remainingTime.days}d</p>
          <p>{remainingTime.hours}h</p>
          <p>{remainingTime.minutes}m</p>
        </span>
      ) : (
        <p className="text-sm text-red-500">{remainingTime.message}</p>
      )}

      {/* Edit Popup */}
      {isEditPopupVisible && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-black mb-4">Edit Task</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-black">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md text-black"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-black">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md text-black"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-black">
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  min={formatInputDate(project.start_date)}
                  max={formatInputDate(project.end_date)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md text-black"
                />
                {errors.start_date && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.start_date}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-black">
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  min={formatInputDate(project.start_date)}
                  max={formatInputDate(project.end_date)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md text-black"
                />
                {errors.end_date && (
                  <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-black">
                  Work Hours
                </label>
                <input
                  type="number"
                  name="time_duration"
                  value={formData.time_duration}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md text-black"
                />
                {errors.time_duration && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.time_duration}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditPopupVisible(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;

// Utility Functions
const calculateRemainingTime = (givenDate) => {
  const currentDate = new Date();
  const baseDate = new Date(givenDate);
  const endDate = new Date(baseDate);
  endDate.setDate(baseDate.getDate() + 1);
  const diffInMilliseconds = endDate - currentDate;
  if (diffInMilliseconds <= 0) {
    return { message: "The Task has ended", timeOver: true };
  }
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const remainingHours = diffInHours % 24;
  const remainingMinutes = diffInMinutes % 60;
  return {
    days: diffInDays,
    hours: remainingHours,
    minutes: remainingMinutes,
    timeOver: false,
    message: "Time Remaining",
  };
};
