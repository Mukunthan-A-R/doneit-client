import React, { useEffect, useState } from "react";
import { fetchProjectById } from "../../services/ProjectServices";

const ProjectInfo = ({ project_id, show, onClose }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProject = async (project_id) => {
      if (project_id) {
        try {
          setLoading(true);
          const data = await fetchProjectById(project_id);
          setProject(data);
          console.log(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getProject(project_id);
  }, []);

  console.log(project);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-96 z-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold pr-2 text-xl "
        >
          &times;
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {project && (
          <div className="text-3xl font-semibold">{project.data.name}</div>
        )}{" "}
        {project && (
          <div className="font-medium">{project.data.description}</div>
        )}{" "}
        {project && <div>Project ID : {project.data.project_id}</div>}
        {project && <div>Priority : {project.data.priority}</div>}
        {project && <div>Status : {project.data.status}</div>}
        {project && (
          <div>Project Start Date : {formatDate(project.data.start_date)}</div>
        )}
        {project && (
          <div>Project End Date : {formatDate(project.data.end_date)}</div>
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Formats to "DD/MM/YYYY"
};
