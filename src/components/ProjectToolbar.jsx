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
import { useMemo } from "react";

const ProjectToolbar = ({ setNavigate }) => {
  const [toggleCreateProject, setToggleCreateProject] =
    useRecoilState(createProjectToggle);
  const sideBarToggle = useRecoilValue(sideBarToggleAtom);
  const {
    handleLogout,
    user: { user },
  } = useAuth();

  const { user_id } = user;

  const toolbarItems = useMemo(
    () => [
      {
        type: "nav",
        to: "/dashboard",
        icon: <RxDashboard size={20} className="shrink-0" />,
        text: "Dashboard",
      },
      {
        type: "nav",
        to: "/user-dashboard",
        icon: <LuCircleUser size={20} className="shrink-0" />,
        text: "User Data",
      },
      {
        type: "button",
        onClick: () => setToggleCreateProject(true),
        icon: <MdOutlineCreateNewFolder size={20} className="shrink-0" />,
        text: "Create Project",
      },
      {
        type: "nav",
        to: "/settings",
        icon: <IoSettingsOutline size={20} className="shrink-0" />,
        text: "Settings",
      },
      {
        type: "button",
        onClick: () => handleLogout(),
        icon: <TbLogout2 size={20} className="shrink-0" />,
        text: "Logout",
      },
    ],
    [],
  );

  return (
    <>
      <ul
        className="mt-4 pl-1 text-white h-full md:data-[isdesktopsidebaropen=true]:w-14 relative isolate transition"
        data-isdesktopsidebaropen={sideBarToggle}
      >
        {toolbarItems.map((item) =>
          item.type === "nav" ? (
            <NavLink
              key={item.text}
              to={item.to}
              className={({ isActive }) =>
                `flex ${
                  isActive ? "bg-blue-700" : ""
                } hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4 ${sideBarToggle ? "md:p-3.5" : ""}`
              }
              onClick={setNavigate}
            >
              {item.icon}
              <MenuItem
                text={item.text}
                className={`${sideBarToggle ? "md:hidden" : ""}`}
              />
            </NavLink>
          ) : (
            <button
              key={item.text}
              className={`flex cursor-pointer w-full hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4  ${sideBarToggle ? "md:p-3.5" : ""}`}
              onClick={item.onClick}
            >
              {item.icon}
              <MenuItem
                className={`${sideBarToggle ? "md:hidden" : ""}`}
                text={item.text}
              />
            </button>
          ),
        )}
      </ul>

      {/* Modals */}
      {toggleCreateProject &&
        createPortal(<CreateProject user_id={user_id} />, document.body)}
    </>
  );
};

export default ProjectToolbar;
