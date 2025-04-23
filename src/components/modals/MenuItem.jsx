import React from "react";

const MenuItem = ({ text }) => {
  return (
    <li className="text-white py-2 px-4 hover:bg-blue-800">
      <p className="py-1">{text}</p>
    </li>
  );
};

export default MenuItem;
