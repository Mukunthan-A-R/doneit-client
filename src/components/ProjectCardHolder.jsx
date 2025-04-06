import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { fetchProjects } from "../services/ProjectServices";

const ProjectCardHolder = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  // Function to remove a project from the list
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
        <div>No current projects</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.project_id}
              project={project}
              onDelete={handleDeleteProject} // Pass the onDelete function to each ProjectCard
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCardHolder;
