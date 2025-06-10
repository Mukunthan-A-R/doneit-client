import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { refetchTriggerAtom } from "../data/atom";
import { fetchProjects } from "../services/ProjectServices";
import ProjectCard from "./ProjectCard";
import { BiPlusCircle } from "react-icons/bi";
import { useSetRecoilState } from "recoil";
import { createProjectToggle } from "../data/atom";

const ProjectCardHolder = ({ user_id }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setToggleCreateProject = useSetRecoilState(createProjectToggle);

  const currentUserId = parseInt(user_id);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.length === 0 ? (
        <div className="text-gray-500 text-center mt-10 text-lg">
          Create new projects to get started !
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            role="button"
            aria-roledescription="Click to create a new project"
            onClick={() => setToggleCreateProject(true)}
            className="max-w-sm cursor-pointer rounded-lg bg-white flex flex-col justify-center items-center gap-3 overflow-hidden relative shadow-md hover:shadow-xl hover:scale-101 transition border-2 border-gray-300 border-dashed"
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
      )}
    </div>
  );
};

export default ProjectCardHolder;
