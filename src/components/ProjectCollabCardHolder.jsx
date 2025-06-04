import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getCollaboratedProjects } from "../services/getCollaboratedProjects";
import ProjectCollabCard from "./ProjectCollabCard";
import { refetchTriggerAtom } from "../data/atom";

const ProjectCollabCardHolder = ({ user_id }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTrigger, setEditTrigger] = useState(1);

  const refetchTrigger = useRecoilValue(refetchTriggerAtom);

  const currentUserId = parseInt(user_id);
  // console.log("projects");
  // console.log(projects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getCollaboratedProjects(currentUserId);
        setProjects(data.data);
        // console.log("Collaborated Projects:", data);
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

    if (currentUserId) fetchProjects();
  }, [currentUserId, refetchTrigger, editTrigger]);

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
          No Collab Project for Now !
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCollabCard
              handleEditTrigger={() => {
                setEditTrigger(editTrigger + 1);
              }}
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

export default ProjectCollabCardHolder;
