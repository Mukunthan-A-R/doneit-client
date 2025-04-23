import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "./modals/MenuItem";
import CreateProject from "./modals/CreateProject";
import FormatProjects from "./modals/FormatProjects";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData } from "../data/atom"; // Update path if needed

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
      <ul className="py-6">
        <button className="w-full text-left" onClick={() => setShowModal(true)}>
          <MenuItem text="Creat Project" />
        </button>
        <Link to="/user-dashboard">
          <MenuItem text="User Data" />
        </Link>
        <button
          className="w-full text-left"
          onClick={() => setIsPopupOpen(true)}
        >
          <MenuItem text="Format Projects" />
        </button>

        <MenuItem text="Settings" />

        <button className="w-full text-left" onClick={() => handleLogout()}>
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
