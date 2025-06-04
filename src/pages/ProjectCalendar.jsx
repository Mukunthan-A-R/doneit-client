import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CalendarCard from "../components/CalendarCard";
import ProjectTitleCard from "../components/ProjectTitleCard";
import { fetchProjectById } from "../services/ProjectServices";
import { fetchTasks } from "../services/TaskServices";

const ProjectCalendar = () => {
  const { project_id } = useParams();

  const [graphData, setGraphData] = useState({});
  const [ProjectData, setProjectData] = useState({
    id: null,
    name: "",
    description: "",
    project_id: null,
    start_date: null,
    end_date: null,
    priority: "",
    status: "",
  });

  useEffect(() => {
    if (project_id) {
      const loadProject = async () => {
        const project = await fetchProjectById(project_id);
        setProjectData(project.data);
      };
      const loadTasks = async () => {
        const tasks = await fetchTasks(project_id);
        const result = formatTasksByDateRange(tasks.data);
        setGraphData(result);
      };

      loadProject();
      loadTasks();
    }
  }, [project_id]);

  return (
    <>
      <ProjectTitleCard />

      <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold"> Project Calendar</h1>
      </header>

      <CalendarCard
        startDate={ProjectData.start_date}
        endDate={ProjectData.end_date}
        tasksByDate={graphData}
      />
    </>
  );
};

export default ProjectCalendar;

const formatTasksByDateRange = (taskArray) => {
  const result = {};

  taskArray.forEach((task) => {
    const start = new Date(task.start_date);
    const end = new Date(task.end_date);

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      const formattedDate = date.toISOString().split("T")[0];

      if (!result[formattedDate]) {
        result[formattedDate] = [];
      }

      result[formattedDate].push({ title: task.title });
    }
  });

  return result;
};
