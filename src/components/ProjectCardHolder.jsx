import { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  createProjectToggle,
  refetchTriggerAtom,
  userData,
} from "../data/atom";
import { fetchProjects } from "../services/ProjectServices";
import ErrorHandler from "./ErrorHandler";
import ProjectCard from "./ProjectCard";
import ProjectCardsSkeleton from "./ProjectCardsSkeleton";

const ProjectCardHolder = () => {
  const { user: currentUserData } = useRecoilValue(userData);
  const currentUserId = parseInt(currentUserData?.user_id);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setToggleCreateProject = useSetRecoilState(createProjectToggle);

  const refetchTrigger = useRecoilValue(refetchTriggerAtom);

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
  }, [currentUserId, refetchTrigger]);

  const handleDeleteProject = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.project_id !== projectId),
    );
  };

  if (loading) return <ProjectCardsSkeleton />;

  if (error) return <ErrorHandler error={error} />;

  return (
    <div
      // className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
      className={`flex flex-wrap gap-6 ${
        projects.length === 0 ? "content" : ""
      }`}
    >
      <div
        role="button"
        aria-roledescription="Click to create a new project"
        onClick={() => setToggleCreateProject(true)}
        className="md:w-[280px] w-full cursor-pointer text-blue-700 py-8 rounded-lg bg-white flex flex-col justify-center items-center gap-3 overflow-hidden relative shadow-md hover:shadow-xl hover:scale-101 transition border-2 border-gray-300 border-dashed"
      >
        <BiPlusCircle size={32} /> Create project
      </div>

      {projects.map((project) => (
        <ProjectCard
          key={project.project_id}
          project={project}
          onDelete={handleDeleteProject}
        />
      ))}
    </div>
  );
};

export default ProjectCardHolder;
