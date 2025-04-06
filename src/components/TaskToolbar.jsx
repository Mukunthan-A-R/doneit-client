import React from "react";
import MenuItem from "./modals/MenuItem";
import { Link } from "react-router-dom";

const TaskToolbar = () => {
  return (
    <ul className="py-6">
      <Link to="/dashboard">
        <MenuItem text="Dashboard" />
      </Link>
      <Link>
        <MenuItem text="Analysis" />
      </Link>

      <MenuItem text="Graph" />

      <MenuItem text="Format Tasks" />
      <MenuItem text="Settings" />
    </ul>
  );
};

export default TaskToolbar;
