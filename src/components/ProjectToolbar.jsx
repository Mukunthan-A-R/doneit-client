import { createPortal } from "react-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { LuCircleUser } from "react-icons/lu";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  createProjectToggle,
  sideBarToggle as sideBarToggleAtom,
} from "../data/atom";
import useAuth from "../hooks/useAuth";
import CreateProject from "./modals/CreateProject";
import MenuItem from "./modals/MenuItem";

const ProjectToolbar = ({ setNavigate }) => {
  const [toggleCreateProject, setToggleCreateProject] =
    useRecoilState(createProjectToggle);
  const sideBarToggle = useRecoilValue(sideBarToggleAtom);
  const {
    handleLogout,
    user: { user },
  } = useAuth();

  const { user_id } = user;

  return (
    <>
      <ul
        className="py-6 pl-1 text-white h-full md:data-[isdesktopsidebaropen=true]:w-14 relative isolate transition border"
        data-isdesktopsidebaropen={sideBarToggle}
      >
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex ${
              isActive ? "bg-blue-700" : ""
            } hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4`
          }
          onClick={setNavigate}
        >
          <RxDashboard size={20} className="shrink-0" />
          <MenuItem
            text="Dashboard"
            className={`${sideBarToggle ? "md:hidden" : ""}`}
          />
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
          <LuCircleUser size={20} className="shrink-0" />
          <MenuItem
            className={`${sideBarToggle ? "md:hidden" : ""}`}
            text="User Data"
          />
        </NavLink>
        <button
          className={`flex cursor-pointer w-full hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4`}
          onClick={() => setToggleCreateProject(true)}
        >
          <MdOutlineCreateNewFolder size={20} className="shrink-0" />
          <MenuItem
            className={`${sideBarToggle ? "md:hidden" : ""}`}
            text="Create Project"
          />
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
          <IoSettingsOutline size={20} className="shrink-0" />
          <MenuItem
            className={`${sideBarToggle ? "md:hidden" : ""}`}
            text="Settings"
          />
        </NavLink>

        <button
          className={`flex cursor-pointer w-full hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4`}
          onClick={() => handleLogout()}
        >
          <TbLogout2 size={20} className="shrink-0" />
          <MenuItem
            className={`${sideBarToggle ? "md:hidden" : ""}`}
            text="Logout"
          />
        </button>
      </ul>

      {/* Modals */}
      {toggleCreateProject &&
        createPortal(<CreateProject user_id={user_id} />, document.body)}
    </>
  );
};

export default ProjectToolbar;
