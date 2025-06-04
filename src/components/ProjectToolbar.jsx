import { useState } from "react";
import { NavLink } from "react-router-dom";
import CreateProject from "./modals/CreateProject";
import FormatProjects from "./modals/FormatProjects";
import MenuItem from "./modals/MenuItem";

import { createPortal } from "react-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { LuCircleUser } from "react-icons/lu";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import useAuth from "../hooks/useAuth";

const ProjectToolbar = ({ user_id }) => {
  const [showModal, setShowModal] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { handleLogout } = useAuth();

  return (
    <>
      <ul className="py-6 text-white h-full">
        <NavLink
          to="/dashboard"
          className="flex hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4"
        >
          <RxDashboard size={20} />
          <MenuItem text="Dashboard" />
        </NavLink>
        <NavLink
          to="/user-dashboard"
          className={({ isActive }) =>
            `flex ${isActive ? "bg-blue-600" : ""} hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4`
          }
        >
          <LuCircleUser size={20} />
          <MenuItem text="User Data" />
        </NavLink>
        <button
          className={`flex cursor-pointer w-full hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4`}
          onClick={() => setShowModal(true)}
        >
          <MdOutlineCreateNewFolder size={20} />
          <MenuItem text="Create Project" />
        </button>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex ${isActive ? "bg-blue-600" : ""} hover:bg-blue-800 rounded-ss-md rounded-es-md items-center pl-4`
          }
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
      {showModal &&
        createPortal(
          <CreateProject user_id={user_id} setShowModal={setShowModal} />,
          document.body,
        )}
      {isPopupOpen && <FormatProjects onCancel={setIsPopupOpen} />}
    </>
  );
};

export default ProjectToolbar;
