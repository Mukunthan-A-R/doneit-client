import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectCardHolder = () => {
  return (
    <div>
      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Render 4 ProjectCard components */}
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProjectCardHolder;
