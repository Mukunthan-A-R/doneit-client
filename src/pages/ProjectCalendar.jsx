import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CalendarCard from "../components/CalendarCard";
import ProjectTitleCard from "../components/ProjectTitleCard";
import useProject from "../hooks/useProject";
import useProjectTasks from "../hooks/useProjectTasks";
import ErrorHandler from "../components/ErrorHandler";

const ProjectCalendar = () => {
  const { projectId } = useParams();

  const [graphData, setGraphData] = useState({});
  const { project, isLoading, error } = useProject(projectId);

  const { tasks, error: taskError } = useProjectTasks(projectId);

  useEffect(() => {
    const result = formatTasksByDateRange(tasks);
    setGraphData(result);
  }, [tasks]);

  if (isLoading || !project) {
    return <p> Loaing Graph ...</p>;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  if (taskError) {
    return <ErrorHandler error={taskError} />;
  }

  return (
    <>
      <ProjectTitleCard />

      <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold"> Project Calendar</h1>
      </header>
      {tasks?.length === 0 ? (
        <p className="flex flex-col justtify-center items-center p-40 text-green-800 text-lg sm:text-xl">
          No tasks here yet! Tap to add your first one and start organizing your
          time.
        </p>
      ) : (
        <CalendarCard
          startDate={project?.start_date}
          endDate={project?.end_date}
          tasksByDate={graphData}
        />
      )}
    </>
  );
};

export default ProjectCalendar;

const formatTasksByDateRange = (taskArray) => {
  const result = {};

  taskArray?.forEach((task) => {
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
