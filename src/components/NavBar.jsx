import { useState } from "react";
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useClickOutside from "../hooks/useClickOutside";

function Navbar() {
  const { user } = useAuth();

  const isLoggedIn = !!user?.token;

  return (
    <nav className="bg-[#0a1e3f] text-white shadow-md z-50 flex justify-center">
      <div className="w-7xl px-4 sm:px-6 py-3 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={"/SandySoft.png"} alt="Logo" className="h-10 w-auto" />
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-blue-300 transition"
          >
            <span className="text-blue-400">D</span>one{" "}
            <span className="text-blue-400">I</span>t
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-blue-400 transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-300 hover:text-blue-400 transition font-medium"
          >
            Dashboard
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <UserDropdown />
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden space-y-2 bg-[#0a1e3f] text-white">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="block px-4 py-2 bg-blue-600 rounded text-white text-center hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <UserDropdown />
          )}
        </div>
      </div>
    </nav>
  );
}

function UserDropdown() {
  const { handleLogout, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleDropdownClose() {
    setIsDropdownOpen(false);
  }

  const handleClickOutside = useClickOutside(handleDropdownClose);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center gap-1 text-gray-300 cursor-pointer hover:text-blue-400 transition"
        ref={handleClickOutside}
      >
        {user?.profile ? (
          <img
            src={user.profile}
            alt={user.name}
            className="size-7 rounded-full object-cover"
          />
        ) : (
          <div className="size-7 rounded-full bg-gray-100 text-blue-900 font-bold text-sm grid place-items-center">
            {user?.name.split(" ")[0][0]} {user?.name.split(" ")[1]?.[0] ?? ""}
          </div>
        )}
        {user?.name.split(" ")[0]}
        <BiChevronDown />
      </button>

      {isDropdownOpen && (
        <div className="absolute animate-fade-in right-0 mt-4 w-32 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg p-1 shadow-lg z-50">
          <Link
            to="/settings"
            className="flex px-2 gap-1 items-center py-1.5 text-sm hover:bg-blue-600 hover:text-white rounded-md transition"
            onClick={handleDropdownClose}
          >
            <IoSettingsOutline />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex gap-1 items-center text-left px-2 py-1.5 text-sm cursor-pointer hover:bg-red-500 rounded-md hover:text-white transition"
          >
            <BiLogOut />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
