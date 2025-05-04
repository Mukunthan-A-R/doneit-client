import React from "react";

const MenuItem = ({ text }) => {
  return (
    <li className="py-2 px-4">
      <p className="py-1 font-sans font-medium text-white ">{text}</p>
    </li>
  );
};

export default MenuItem;
