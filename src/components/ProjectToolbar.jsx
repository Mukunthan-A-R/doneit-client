import React from "react";
import MenuItem from "./MenuItem";

const ProjectToolbar = () => {
  return (
    <ul className="py-6">
      <MenuItem text="Creat Project" />
      <MenuItem text="Edit User" />
      <MenuItem text="Format Projects" />
      <MenuItem text="Settings" />
      <MenuItem text="Logout" />
    </ul>
  );
};

export default ProjectToolbar;
