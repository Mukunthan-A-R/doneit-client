import React, { useState } from "react";
import MenuItem from "./modals/MenuItem";
import CreateProject from "./modals/CreateProject";
import FormatProjects from "./modals/FormatProjects";

const ProjectToolbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        <MenuItem text="Logout" />
      </ul>

      {/* Modals */}
      <CreateProject showModal={showModal} setShowModal={setShowModal} />
      {isPopupOpen && <FormatProjects onCancel={setIsPopupOpen} />}
    </>
  );
};

export default ProjectToolbar;
