import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "./modals/MenuItem";
import CreateProject from "./modals/CreateProject";
import FormatProjects from "./modals/FormatProjects";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData } from "../data/atom";

import { RxDashboard } from "react-icons/rx";
import { LuCircleUser } from "react-icons/lu";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";

const ProjectToolbar = ({ user_id, handleTrigger }) => {
  const [showModal, setShowModal] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useRecoilState(userData);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("userData");
    setUser({
      token: null,
      user_id: null,
      name: "",
      email: "",
      loggedIn: false,
    });
    navigate("/login");
  };

  return (
    <>
      <ul className="py-6 text-white">
        <Link
          to="/dashboard"
          className="flex  hover:bg-blue-800 items-center pl-4"
        >
          <RxDashboard size={20} />
          <MenuItem text="Dashboard" />
        </Link>
        <Link
          to="/user-dashboard"
          className="flex  hover:bg-blue-800 items-center pl-4"
        >
          <LuCircleUser size={20} />
          <MenuItem text="User Data" />
        </Link>
        <button
          className="w-full text-left flex  hover:bg-blue-800 items-center pl-4"
          onClick={() => setShowModal(true)}
        >
          <MdOutlineCreateNewFolder size={20} />
          <MenuItem text="Create Project" />
        </button>
        {/* <button
          className="w-full text-left"
          onClick={() => setIsPopupOpen(true)}
        >
          <MenuItem text="Format Projects" />
        </button> */}
        <Link
          to="/settings"
          className="w-full text-left flex  hover:bg-blue-800 items-center pl-4"
        >
          <IoSettingsOutline size={20} />
          <MenuItem text="Settings" />
        </Link>

        <button
          className="w-full text-left flex  hover:bg-blue-800 items-center pl-4"
          onClick={() => handleLogout()}
        >
          <TbLogout2 size={20} />
          <MenuItem text="Logout" />
        </button>
      </ul>

      {/* Modals */}
      <CreateProject
        handleTrigger={handleTrigger}
        user_id={user_id}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {isPopupOpen && <FormatProjects onCancel={setIsPopupOpen} />}
    </>
  );
};

export default ProjectToolbar;
