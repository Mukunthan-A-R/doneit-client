import { useParams } from "react-router-dom";
import GanttChart from "../components/GanttChart";
import GanttChartTimeLine from "../components/GanttChartTimeLine";
import ProjectTitleCard from "../components/ProjectTitleCard";

const Graph = () => {
  const { projectId } = useParams();

  return (
    <>
      <ProjectTitleCard project_id={projectId}></ProjectTitleCard>

      <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold"> Project Graph</h1>
      </header>

      <GanttChart projectId={projectId} />
      <GanttChartTimeLine projectId={projectId} />
    </>
  );
};

export default Graph;
