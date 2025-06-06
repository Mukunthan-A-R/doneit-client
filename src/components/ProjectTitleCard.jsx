import { useParams } from "react-router-dom";
import useProject from "../hooks/useProject";
import { formatDate } from "../services/utils";
import ProjectInfo from "./modals/ProjectInfo";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

const ProjectTitleCard = () => {
  const { projectId } = useParams();
  const [showInfo, setShowInfo] = useState(false);
  const { project } = useProject(projectId);

  return (
    <div className="mb-6 sm:mb-4">
      <div className="flex flex-col md:flex-row items-center gap-2 ">
        <h2 className="text-2xl font-medium ">{project?.name}</h2>
        <span className="flex gap-2">
          <p className="mt-2">
            ( {formatDate(project?.start_date)} to{" "}
            {formatDate(project?.end_date)} )
          </p>
          <p className="font-medium flex items-center mt-2">
            <span
              className={` px-2 py-1 rounded-full text-white text-xs font-semibold ${
                project?.priority === "low"
                  ? "bg-green-500"
                  : project?.priority === "medium"
                    ? "bg-orange-500"
                    : "bg-red-500"
              }`}
            >
              {project?.priority}
            </span>

            {showInfo && <ProjectInfo onClose={() => setShowInfo(false)} />}
          </p>
        </span>
        <button
          onClick={() => setShowInfo(true)}
          className="flex items-center justify-center cursor-pointer transition duration-300 rounded-full"
        >
          <MdInfoOutline size={30} />
        </button>
      </div>
      <p className="font-medium">Description : {project?.description}</p>
      <p className="font-medium"> Status : {project?.status}</p>
    </div>
  );
};

export default ProjectTitleCard;
