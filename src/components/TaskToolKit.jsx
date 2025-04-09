import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";
import ProjectInfo from "./modals/ProjectInfo";
import CreateTask from "./modals/CreateTask"; // Import the new task creation component

const TaskToolKit = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false); // State to toggle CreateTask visibility

  return (
    <>
      <div className="bg-amber-300 h-full flex flex-col p-2 pt-15 gap-5">
        {/* Show Project Info */}
        <button onClick={() => setShowInfo(true)}>
          <MdInfoOutline size={30} />
        </button>

        {/* Trigger CreateTask component */}
        <button onClick={() => setShowCreateTask(true)}>
          <IoMdAddCircleOutline size={30} />
        </button>
      </div>

      {/* Show the ProjectInfo modal */}
      <ProjectInfo show={showInfo} onClose={() => setShowInfo(false)} />

      {/* Show the CreateTask modal */}
      {showCreateTask && (
        <CreateTask
          show={showCreateTask}
          onClose={() => setShowCreateTask(false)} // Close the modal
        />
      )}
    </>
  );
};

export default TaskToolKit;
