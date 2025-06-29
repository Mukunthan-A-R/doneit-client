import { NavLink } from "react-router-dom";
import CreateProject from "./modals/CreateProject";
import MenuItem from "./modals/MenuItem";

import { createPortal } from "react-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { LuCircleUser } from "react-icons/lu";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { createProjectToggle } from "../data/atom";
import useAuth from "../hooks/useAuth";

const ProjectToolbar = ({ setNavigate }) => {
  const [toggleCreateProject, setToggleCreateProject] =
    useRecoilState(createProjectToggle);
  const {
    handleLogout,
    user: { user },
  } = useAuth();

  const { user_id } = user;

  return (
    <>
      <ul className="py-6 text-white h-full">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex ${
              isActive ? "bg-blue-700" : ""
            } hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4`
          }
          onClick={setNavigate}
        >
          <RxDashboard size={20} />
          <MenuItem text="Dashboard" />
        </NavLink>
        <NavLink
          to="/user-dashboard"
          className={({ isActive }) =>
            `flex ${
              isActive ? "bg-blue-700" : ""
            } hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4`
          }
          onClick={setNavigate}
        >
          <LuCircleUser size={20} />
          <MenuItem text="User Data" />
        </NavLink>
        <button
          className={`flex cursor-pointer w-full hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4`}
          onClick={() => setToggleCreateProject(true)}
        >
          <MdOutlineCreateNewFolder size={20} />
          <MenuItem text="Create Project" />
        </button>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex ${
              isActive ? "bg-blue-700" : ""
            } hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4`
          }
          onClick={setNavigate}
        >
          <IoSettingsOutline size={20} />
          <MenuItem text="Settings" />
        </NavLink>

        <button
          className={`flex cursor-pointer w-full hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4`}
          onClick={() => handleLogout()}
        >
          <TbLogout2 size={20} />
          <MenuItem text="Logout" />
        </button>
      </ul>

      {/* Modals */}
      {toggleCreateProject &&
        createPortal(<CreateProject user_id={user_id} />, document.body)}
    </>
  );
};

export default ProjectToolbar;
