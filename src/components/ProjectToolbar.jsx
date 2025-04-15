import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    setUser({});
    navigate("/login");
  };

  return (
    <>
      <ul className="py-6">
        <button onClick={() => setShowModal(true)}>
          <MenuItem text="Creat Project" />
        </button>
        <MenuItem text="Edit User" />
        <button onClick={() => setIsPopupOpen(true)}>
          <MenuItem text="Format Projects" />
        </button>

        <MenuItem text="Settings" />

        <button onClick={() => handleLogout()}>
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
