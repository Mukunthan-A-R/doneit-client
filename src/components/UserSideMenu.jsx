import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData } from "../data/atom";

import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

const UserSideMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userData);

  const handleLogout = () => {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("userData");
    setUser({
      token: null,
      user_id: null,
      name: "",
      email: "",
      loggedIn: false,
    });
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-blue-900 text-white flex-shrink-0">
      <div className="p-6 text-center text-2xl font-bold border-b border-blue-800">
        TaskBoard
      </div>
      <nav className="mt-6">
        <Link
          to="/dashboard"
          className="block py-3 px-6 hover:bg-blue-800 flex items-center gap-4"
        >
          <RxDashboard size={20} />
          My Projects
        </Link>

        <Link
          to="/settings"
          className="block py-3 px-6 hover:bg-blue-800 flex items-center gap-4"
        >
          <IoSettingsOutline size={20} />
          Settings
        </Link>
        <div
          onClick={handleLogout}
          className="block py-3 px-6 hover:bg-blue-800 flex items-center gap-4"
        >
          <TbLogout2 size={20} />
          Logout
        </div>
      </nav>
    </aside>
  );
};

export default UserSideMenu;
