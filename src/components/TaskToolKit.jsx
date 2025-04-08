import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";
import ProjectInfo from "./modals/ProjectInfo";

const TaskToolKit = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <div className="bg-amber-300 h-full flex flex-col p-2 pt-15 gap-5">
        {/* Show Project Info */}
        <button onClick={() => setShowInfo(true)}>
          <MdInfoOutline size={30} />
        </button>

        <IoMdAddCircleOutline size={30} />
      </div>

      <ProjectInfo
        show={showInfo}
        onClose={() => setShowInfo(false)}
      ></ProjectInfo>
    </>
  );
};

export default TaskToolKit;
