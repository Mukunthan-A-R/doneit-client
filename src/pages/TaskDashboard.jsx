import React, { useEffect, useState } from "react";
import TaskToolbar from "../components/TaskToolbar";
import TaskCardHolder from "../components/TaskCardHolder";
import TaskToolKit from "../components/TaskToolKit";
import { useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";
import { getCollaboratedProjects } from "../services/getCollaboratedProjects";

const TaskDashboard = () => {
  const [userRole, setUserRole] = useState("");
  const currentUserData = useRecoilValue(userData);

  const params = useParams();
  const project_id = params.projectId;

  const currentUserId = currentUserData.user_id;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getCollaboratedProjects(currentUserId);
        const project = data.find((p) => p.project_id === parseInt(project_id));
        if (project) {
          setUserRole(project.role);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log("No data");
        } else {
          console.log(err.message);
        }
      }
    };

    if (currentUserId) fetchProjects();
  }, [currentUserId]);

  return <TaskCardHolder userRole={userRole} project_id={project_id} />;
};

export default TaskDashboard;
