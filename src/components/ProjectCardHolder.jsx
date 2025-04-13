import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { fetchProjects } from "../services/ProjectServices";

const ProjectCardHolder = ({ user_id }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserId = parseInt(user_id);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects(currentUserId);
        setProjects(data.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setProjects([]); // No projects found
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, [currentUserId]);

  const handleDeleteProject = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.project_id !== projectId)
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.length === 0 ? (
        <div className="text-gray-500 text-center mt-10 text-lg">
          Add new projects to get started
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.project_id}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCardHolder;
