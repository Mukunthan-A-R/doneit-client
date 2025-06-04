import { NavLink } from "react-router-dom";
import MenuItem from "./modals/MenuItem";

import { AiOutlineUserAdd } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuDatabase } from "react-icons/lu";
import { MdTimeline } from "react-icons/md";
import { PiFireSimpleBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { SiSimpleanalytics } from "react-icons/si";
import { VscPieChart } from "react-icons/vsc";
import { BsArrowLeft } from "react-icons/bs";

const TaskToolbar = ({ project_id }) => {
  return (
    <>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex ${isActive ? "bg-blue-600" : ""} py-3 gap-2 text-left text-white hover:bg-blue-800 items-center pl-4`
        }
      >
        <BsArrowLeft size={20} />
        Back to dashboard
      </NavLink>
      <ul>
        <NavLink
          to={`/tasks/${project_id}`}
          className={({ isActive }) =>
            `flex ${isActive ? "bg-blue-600" : ""} text-white rounded-es-md rounded-ss-md hover:bg-blue-800 items-center pl-4`
          }
        >
          <FaTasks size={20} />
          <MenuItem text="Task Tracker" />
        </NavLink>
        <NavLink
          to={`/analytics/${project_id}`}
          className={({ isActive }) =>
            `flex ${isActive ? "bg-blue-600" : ""} text-white rounded-es-md rounded-ss-md hover:bg-blue-800 items-center pl-4`
          }
        >
          <SiSimpleanalytics size={20} />
          <MenuItem text="Analysis" />
        </NavLink>
        <NavLink
          to={`/graph/${project_id}`}
          className={({ isActive }) =>
            `flex ${isActive ? "bg-blue-600" : ""} text-white rounded-es-md rounded-ss-md hover:bg-blue-800 items-center pl-4`
          }
        >
          <MdTimeline size={20} />
          <MenuItem text="Graph" />
        </NavLink>
        <NavLink
          to={`/heat-map/${project_id}`}
          className={({ isActive }) =>
            `flex ${isActive ? "bg-blue-600" : ""} text-white rounded-es-md rounded-ss-md hover:bg-blue-800 items-center pl-4`
          }
        >
          <PiFireSimpleBold size={20} />
          <MenuItem text="Heat Map" />
        </NavLink>
        <NavLink
          to={`/project-calendar/${project_id}`}
          className={({ isActive }) =>
            `flex ${isActive ? "bg-blue-600" : ""} text-white rounded-es-md rounded-ss-md hover:bg-blue-800 items-center pl-4`
          }
        >
          <IoCalendarClearOutline size={20} />
          <MenuItem text="Calendar" />
        </NavLink>
        <NavLink
          to={`/list/${project_id}`}
          className={({ isActive }) =>
            `flex ${isActive ? "bg-blue-600" : ""} text-white rounded-es-md rounded-ss-md hover:bg-blue-800 items-center pl-4`
          }
        >
          <BiTask size={20} />
          <MenuItem text="Task List" />
        </NavLink>
        <NavLink
          to={`/adduser/${project_id}`}
          className={({ isActive }) =>
            `flex ${isActive ? "bg-blue-600" : ""} text-white rounded-es-md rounded-ss-md hover:bg-blue-800 items-center pl-4`
          }
        >
          <AiOutlineUserAdd size={20} />
          <MenuItem text="Add User" />
        </NavLink>
        <NavLink
          to={`/transaction/${project_id}`}
          className={({ isActive }) =>
            `flex ${isActive ? "bg-blue-600" : ""} text-white rounded-es-md rounded-ss-md hover:bg-blue-800 items-center pl-4`
          }
        >
          <LuDatabase size={20} />
          <MenuItem text="Logs" />
        </NavLink>
        <NavLink
          to={`/transaction-analytics/${project_id}`}
          className={({ isActive }) =>
            `flex ${isActive ? "bg-blue-600" : ""} text-white rounded-es-md rounded-ss-md hover:bg-blue-800 items-center pl-4`
          }
        >
          <VscPieChart size={20} />
          <MenuItem text="Insights" />
        </NavLink>
        {/* <MenuItem text="Format Tasks" /> */}
        {/* <NavLink
        to="/settings"
        className={({ isActive }) => `flex ${isActive? 'bg-blue-600': ''} text-white hover:bg-blue-800 items-center pl-4`}
      >
        <IoSettingsOutline size={20} />
        <MenuItem text="Settings" />
      </NavLink> */}
      </ul>
    </>
  );
};

export default TaskToolbar;
