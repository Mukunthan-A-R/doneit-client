import React, { useEffect, useState } from "react";
import { fetchProjectById } from "../services/ProjectServices";

const ProjectTitleCard = ({ project_id }) => {
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

  useEffect(() => {
    const getProject = async (project_id) => {
      if (project_id) {
        try {
          const { data } = await fetchProjectById(project_id);
          setProject(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    getProject(project_id);
  }, []);

  return (
    <div className="mb-6 sm:mb-4">
      <div className="flex flex-col sm:flex-row  gap-2 mt-2 lg:mt-0">
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
    </div>
  );
};

export default ProjectTitleCard;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};
