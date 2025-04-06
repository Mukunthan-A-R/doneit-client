import React from "react";
import MenuItem from "./MenuItem";

const ProjectTollbar = () => {
  return (
    <div className=" bg-blue-900 p-6">
      <ul>
        <MenuItem text="Creat Project" />
        <MenuItem text="Edit User" />
        <MenuItem text="Format Projects" />
        <MenuItem text="Settings" />
        <MenuItem text="Logout" />
      </ul>
    </div>
  );
};

export default ProjectTollbar;
