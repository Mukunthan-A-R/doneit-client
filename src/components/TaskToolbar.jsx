import React from "react";
import MenuItem from "./modals/MenuItem";
import { Link } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";
import { FaTasks } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { MdTimeline } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { PiFireSimpleBold } from "react-icons/pi";
import { LuDatabase } from "react-icons/lu";
import { VscPieChart } from "react-icons/vsc";
import { TbLogout2 } from "react-icons/tb";

const TaskToolbar = ({ project_id }) => {
  return (
    <ul className="py-6 h-screen">
      <Link
        to="/dashboard"
        className="flex text-white hover:bg-blue-800 items-center pl-4"
      >
        <RxDashboard size={20} />
        <MenuItem text="Dashboard" />
      </Link>
      <Link
        to={`/tasks/${project_id}`}
        className="flex text-white hover:bg-blue-800 items-center pl-4"
      >
        <FaTasks size={20} />
        <MenuItem text="Task Tracker" />
      </Link>
      <Link
        to={`/analytics/${project_id}`}
        className="flex text-white hover:bg-blue-800 items-center pl-4"
      >
        <SiSimpleanalytics size={20} />
        <MenuItem text="Analysis" />
      </Link>
      <Link
        to={`/graph/${project_id}`}
        className="flex text-white hover:bg-blue-800 items-center pl-4"
      >
        <MdTimeline size={20} />
        <MenuItem text="Graph" />
      </Link>
      <Link
        to={`/heat-map/${project_id}`}
        className="flex text-white hover:bg-blue-800 items-center pl-4"
      >
        <PiFireSimpleBold size={20} />
        <MenuItem text="Heat Map" />
      </Link>
      <Link
        to={`/project-calendar/${project_id}`}
        className="flex text-white hover:bg-blue-800 items-center pl-4"
      >
        <IoCalendarClearOutline size={20} />
        <MenuItem text="Calendar" />
      </Link>
      <Link
        to={`/list/${project_id}`}
        className="flex text-white hover:bg-blue-800 items-center pl-4"
      >
        <BiTask size={20} />
        <MenuItem text="Task List" />
      </Link>
      <Link
        to={`/adduser/${project_id}`}
        className="flex text-white hover:bg-blue-800 items-center pl-4"
      >
        <AiOutlineUserAdd size={20} />
        <MenuItem text="Add User" />
      </Link>
      <Link
        to={`/transaction/${project_id}`}
        className="flex text-white hover:bg-blue-800 items-center pl-4"
      >
        <LuDatabase size={20} />
        <MenuItem text="Logs" />
      </Link>
      <Link
        to={`/transaction-analytics/${project_id}`}
        className="flex text-white hover:bg-blue-800 items-center pl-4"
      >
        <VscPieChart size={20} />
        <MenuItem text="Insights" />
      </Link>
      {/* <MenuItem text="Format Tasks" /> */}
      {/* <Link
        to="/settings"
        className="flex text-white hover:bg-blue-800 items-center pl-4"
      >
        <IoSettingsOutline size={20} />
        <MenuItem text="Settings" />
      </Link> */}
    </ul>
  );
};

export default TaskToolbar;
