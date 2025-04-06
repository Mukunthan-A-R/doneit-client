import React, { useState } from "react";
import MenuItem from "./modals/MenuItem";
import CreateProject from "./modals/CreateProject";

const ProjectToolbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ul className="py-6">
        <button onClick={() => setShowModal(true)}>
          <MenuItem text="Creat Project" />
        </button>
        <MenuItem text="Edit User" />
        <MenuItem text="Format Projects" />
        <MenuItem text="Settings" />
        <MenuItem text="Logout" />
      </ul>

      {/* Modals */}
      <CreateProject showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default ProjectToolbar;
