import { NavLink, useParams } from "react-router-dom";
import MenuItem from "./modals/MenuItem";

import { AiOutlineUserAdd } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import {
  IoCalendarClearOutline,
  IoChatboxEllipsesOutline,
} from "react-icons/io5";
import { LuDatabase } from "react-icons/lu";
import { MdTimeline } from "react-icons/md";
import { PiFireSimpleBold } from "react-icons/pi";
import { SiSimpleanalytics } from "react-icons/si";
import { VscPieChart } from "react-icons/vsc";
import { useRecoilValue } from "recoil";
import { sideBarToggle as sideBarToggleAtom } from "../data/atom";

const navItems = [
  {
    to: (id) => `/tasks/${id}`,
    icon: <FaTasks size={20} className="shrink-0" />,
    text: "Task Tracker",
  },
  {
    to: (id) => `/analytics/${id}`,
    icon: <SiSimpleanalytics size={20} className="shrink-0" />,
    text: "Analysis",
  },
  {
    to: (id) => `/graph/${id}`,
    icon: <MdTimeline size={20} className="shrink-0" />,
    text: "Graph",
  },
  {
    to: (id) => `/heat-map/${id}`,
    icon: <PiFireSimpleBold size={20} className="shrink-0" />,
    text: "Heat Map",
  },
  {
    to: (id) => `/project-calendar/${id}`,
    icon: <IoCalendarClearOutline size={20} className="shrink-0" />,
    text: "Calendar",
  },
  {
    to: (id) => `/list/${id}`,
    icon: <BiTask size={20} className="shrink-0" />,
    text: "Task List",
  },
  {
    to: (id) => `/ai-assistant/${id}`,
    icon: <IoChatboxEllipsesOutline size={20} className="shrink-0" />,
    text: "AI Assistant",
  },
  {
    to: (id) => `/adduser/${id}`,
    icon: <AiOutlineUserAdd size={20} className="shrink-0" />,
    text: "Add User",
  },
  {
    to: (id) => `/transaction/${id}`,
    icon: <LuDatabase size={20} className="shrink-0" />,
    text: "Logs",
  },
  {
    to: (id) => `/transaction-analytics/${id}`,
    icon: <VscPieChart size={20} className="shrink-0" />,
    text: "Insights",
  },
];

const TaskToolbar = ({ setNavigate }) => {
  const { projectId } = useParams();
  const sideBarToggle = useRecoilValue(sideBarToggleAtom);

  return (
    <>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex ${
            isActive ? "bg-blue-700" : ""
          } py-3 gap-2 text-left text-white hover:bg-blue-800 items-center pl-4`
        }
      >
        <BsArrowLeft size={20} className="shrink-0" />
        <p className={`${sideBarToggle ? "md:hidden" : ""}`}>
          Back to dashboard
        </p>
      </NavLink>
      <ul
        className="md:data-[isdesktopsidebaropen=true]:w-14 pl-1 mt-3"
        data-isdesktopsidebaropen={sideBarToggle}
      >
        {navItems.map(({ to, icon, text }) => (
          <NavLink
            key={text}
            to={to(projectId)}
            className={({ isActive }) =>
              `flex ${
                isActive ? "bg-blue-700" : ""
              } text-white rounded-es-md rounded-ss-md hover:bg-blue-800 items-center pl-4 ${
                sideBarToggle ? "md:p-3.5" : ""
              }`
            }
            onClick={setNavigate}
          >
            {icon}
            <MenuItem
              text={text}
              className={`${sideBarToggle ? "md:hidden" : ""}`}
            />
          </NavLink>
        ))}
      </ul>
    </>
  );
};

export default TaskToolbar;
