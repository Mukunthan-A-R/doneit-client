import { useParams } from "react-router-dom";
import AddUserRoles from "../components/AddUserRoles";
import ProjectTitleCard from "../components/ProjectTitleCard";
import useProjectTasks from "../hooks/useProjectTasks";
import ErrorHandler from "../components/ErrorHandler";

const AddProjectUser = () => {
  const params = useParams();
  const project_id = params.projectId;

  const { tasks, refetch, isLoading, error } = useProjectTasks(project_id);

  if (error) {
    return <ErrorHandler error={error} />;
  }

  return (
    <>
      <ProjectTitleCard project_id={project_id}></ProjectTitleCard>

      <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold">Add Collaborator</h1>
      </header>

      <AddUserRoles />
    </>
  );
};

export default AddProjectUser;
