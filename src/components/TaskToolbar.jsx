import React from "react";
import MenuItem from "./modals/MenuItem";
import { Link } from "react-router-dom";

const TaskToolbar = () => {
  return (
    <ul className="py-6">
      <Link to="/dashboard">
        <MenuItem text="Dashboard" />
      </Link>
      <Link to="/tasks">
        <MenuItem text="Task Tracker" />
      </Link>
      <Link to="/analytics">
        <MenuItem text="Analysis" />
      </Link>
      <Link to="/graph">
        <MenuItem text="Graph" />
      </Link>
      <Link to="/project-calendar">
        <MenuItem text="Calendar" />
      </Link>
      <MenuItem text="Format Tasks" />
      <MenuItem text="Settings" />
    </ul>
  );
};

export default TaskToolbar;
