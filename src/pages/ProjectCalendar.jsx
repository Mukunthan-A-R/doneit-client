import React, { useState, useEffect } from "react";

import CalendarCard from "../components/CalendarCard";
import TaskToolbar from "../components/TaskToolbar";
import TaskToolKit from "../components/TaskToolKit";

import { useRecoilValue } from "recoil";
import { CurrentProject } from "../data/atom";
import { fetchTasks } from "../services/TaskServices";
import { useParams } from "react-router-dom";

const ProjectCalendar = () => {
  const params = useParams();
  const project_id = params.projectId;

  const [trigger, setTrigger] = useState(1);
  const [graphData, setGraphData] = useState({});
  const currentProject = useRecoilValue(CurrentProject);

  const handleCreateTask = () => {
    setTrigger(trigger + 1);
  };

  useEffect(() => {
    if (project_id) {
      const loadTasks = async () => {
        const tasks = await fetchTasks(project_id);
        console.log(tasks);

        const result = formatTasksByDateRange(tasks.data);
        setGraphData(result);
      };
      loadTasks();
    }
  }, [project_id]);

  return (
    <div className="min-h-screen flex">
      <div className={`lg:block w-1/6 bg-blue-900 p-4`}>
        <h2 className="text-white">Task Toolbar</h2>
        <TaskToolbar project_id={project_id}></TaskToolbar>
      </div>
      <div className="w-full lg:w-5/6 bg-white p-6">
        <CalendarCard
          startDate={currentProject.start_date}
          endDate={currentProject.end_date}
          tasksByDate={graphData}
        />
      </div>
    </div>
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
