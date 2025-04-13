import React, { useState } from "react";
import ProjectCardHolder from "../components/ProjectCardHolder";
import ProjectToolbar from "../components/ProjectToolbar";

import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";

const Dashboard = () => {
  const [trigger,setTrigger] = useState(1)

  const currentUserData = useRecoilValue(userData);
  console.log(currentUserData);

  
  return (
    <div className="min-h-screen flex">
      <div className={`lg:block w-1/6 bg-blue-900 p-4`}>
        <h2 className="text-white">Project Toolbar</h2>
        <ProjectToolbar handleTrigger={() => {setTrigger(trigger + 1)}} user_id={currentUserData.user_id}></ProjectToolbar>
      </div>

      <div className="w-full lg:w-5/6 bg-white p-6">
        <h1 className="text-2xl font-semibold pb-4">Your Projects !</h1>
        {
          trigger &&
          <ProjectCardHolder trigger={trigger} user_id={currentUserData.user_id}></ProjectCardHolder>

        }
      </div>
    </div>
  );
};

export default Dashboard;
