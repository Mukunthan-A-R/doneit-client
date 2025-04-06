import React from "react";

const MenuItem = ({ text }) => {
  return (
    <li className="font-medium text-white py-2 px-4 ">
      <p className="hover:text-gray-300">{text}</p>
    </li>
  );
};

export default MenuItem;
