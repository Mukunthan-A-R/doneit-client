import React, { useEffect, useState } from "react";
import ProjectToolbar from "../components/ProjectToolbar";

import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";

import { useNavigate } from "react-router-dom";
import SettingsPage from "../components/SettingsPage";

const Settings = () => {
  const [trigger, setTrigger] = useState(1);

  const navigate = useNavigate();

  const currentUserData = useRecoilValue(userData);
  console.log(currentUserData);

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="min-h-screen flex">
      <div className={`lg:block w-1/6 bg-blue-900 p-2`}>
        <h2 className="text-white p-6 text-center text-2xl font-bold border-b border-blue-800">
          Project Toolbar
        </h2>
        <ProjectToolbar
          handleTrigger={() => {
            setTrigger(trigger + 1);
          }}
          user_id={currentUserData.user_id}
        ></ProjectToolbar>
      </div>

      <div className="w-full lg:w-5/6 bg-white p-6">
        <h1 className="text-2xl font-semibold pb-4">Your Settings !</h1>
        <SettingsPage></SettingsPage>
      </div>
    </div>
  );
};

export default Settings;
