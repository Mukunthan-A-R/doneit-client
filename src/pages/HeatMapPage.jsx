import { useParams } from "react-router-dom";
import HeatMap from "../components/HeatMap";
import ProjectTitleCard from "../components/ProjectTitleCard";

const HeatMapPage = () => {
  const params = useParams();
  const project_id = params.projectId;

  return (
    <>
      <ProjectTitleCard project_id={project_id}></ProjectTitleCard>
      <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold"> Project Heat Map</h1>
      </header>

      <HeatMap projectId={project_id}></HeatMap>
    </>
  );
};

export default HeatMapPage;
