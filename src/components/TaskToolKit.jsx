import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";
import ProjectInfo from "./modals/ProjectInfo";
import CreateTask from "./modals/CreateTask"; // Import the new task creation component

const TaskToolKit = ({ onCreateTask }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false); // State to toggle CreateTask visibility
  const [hoveredButton, setHoveredButton] = useState(null); // State to track hovered button

  // Tooltip descriptions
  const toolDescriptions = {
    info: "View project information",
    createTask: "Create a new task",
  };

  return (
    <>
      <div className="bg-blue-900 h-full flex flex-col pt-15 gap-5 text-white relative pr-5">
        {/* Show Project Info Button */}
        <div
          className="relative"
          onMouseEnter={() => setHoveredButton("info")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <button
            onClick={() => setShowInfo(true)}
            className="flex items-center justify-center hover:bg-blue-700 transition duration-300 rounded-full"
          >
            <MdInfoOutline size={30} />
          </button>
          {hoveredButton === "info" && (
            <div className="absolute left-full top-0 bg-blue-800 text-white text-sm p-1 rounded-md w-48 ml-2">
              {toolDescriptions.info}
            </div>
          )}
        </div>

        {/* Trigger CreateTask Button */}
        <div
          className="relative"
          onMouseEnter={() => setHoveredButton("createTask")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <button
            onClick={() => setShowCreateTask(true)}
            className="flex items-center justify-center hover:bg-blue-700 transition duration-300 rounded-full"
          >
            <IoMdAddCircleOutline size={30} />
          </button>
          {hoveredButton === "createTask" && (
            <div className="absolute left-full top-0 bg-blue-800 text-white text-sm p-1 rounded-md w-48 ml-2">
              {toolDescriptions.createTask}
            </div>
          )}
        </div>
      </div>

      {/* Show the ProjectInfo modal */}
      <ProjectInfo show={showInfo} onClose={() => setShowInfo(false)} />

      {/* Show the CreateTask modal */}
      {showCreateTask && (
        <CreateTask
          onCreateTask={onCreateTask}
          show={showCreateTask}
          onClose={() => setShowCreateTask(false)} // Close the modal
        />
      )}
    </>
  );
};

export default TaskToolKit;
