import { useParams } from "react-router-dom";
import HeatMap from "../components/HeatMap";
import ProjectTitleCard from "../components/ProjectTitleCard";
import useProjectTasks from "../hooks/useProjectTasks";
import ErrorHandler from "../components/ErrorHandler";

const HeatMapPage = () => {
  const { projectId } = useParams();
  const { tasks, error, isLoading } = useProjectTasks(projectId);

  if (isLoading)
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading Project...
      </div>
    );

  if (error) return <ErrorHandler error={error} />;

  return (
    <>
      <ProjectTitleCard project_id={projectId} />
      <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold">Project Heat Map</h1>
      </header>
      <HeatMap projectId={projectId} />
    </>
  );
};

export default HeatMapPage;
