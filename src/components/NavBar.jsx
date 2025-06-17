import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import SandySoft from "../../public/SandySoft.png";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user } = useAuth();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const isLoggedIn = !!user?.token;

  return (
    <nav className="bg-[#0a1e3f] text-white shadow-md z-50 flex justify-center">
      <div className="w-7xl px-4 sm:px-6 py-3 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={SandySoft} alt="Logo" className="h-10 w-auto" />
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
            <UserDropdown state={isDropdownOpen} setState={toggleDropdown} />
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
            <UserDropdown state={isDropdownOpen} setState={toggleDropdown} />
          )}
        </div>
      </div>
    </nav>
  );
}

function UserDropdown({ state, setState }) {
  const { handleLogout, user } = useAuth();
  return (
    <div className="relative">
      <button
        onClick={setState}
        className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition"
      >
        <FaUserCircle className="text-2xl" />
        {user?.name.split(" ")[0]}
      </button>

      {state && (
        <div className="absolute right-0 mt-4 w-48 bg-gray-50 text-blue-700 border border-gray-200 rounded shadow-lg z-50">
          <Link
            to="/settings"
            className="block px-4 py-2 hover:bg-white transition"
            onClick={setState}
          >
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 cursor-pointer hover:bg-white transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
