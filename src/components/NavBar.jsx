import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useClickOutside from "../hooks/useClickOutside";

const PATHNAMES_TO_DISABLED_LINKS = ["/tasks"];

function Navbar() {
  const { user, isLoading } = useAuth();
  // const { pathname } = useLocation();

  const isLoggedIn = !!user?.user?.token;

  const isLinkInDashboardDisabled = false;

  return (
    <>
      <nav className="bg-[#0a1e3f] fixed top-0 left-0 w-full text-white shadow-md z-50 flex justify-center">
        <div className="w-full px-4 sm:px-6 py-2.5 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={"/SandySoft.png"} alt="Logo" className="h-8 w-auto" />
            <Link
              to="/"
              className="text-xl font-bold text-white hover:text-blue-300 transition"
            >
              <span className="text-blue-400">D</span>one{" "}
              <span className="text-blue-400">I</span>t
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLinkInDashboardDisabled && (
              <>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-blue-400 transition font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className={`text-gray-300 hover:text-blue-400 transition font-medium ${isLoading ? "pointer-events-none animate-pulse" : ""}`}
                >
                  Dashboard
                </Link>
              </>
            )}

            {isLoading ? (
              <div className="flex gap-2 items-center">
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.100", opacity: "50%" }}
                  variant="circular"
                >
                  <div className="size-7 rounded-md"></div>
                </Skeleton>
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.100", opacity: "50%" }}
                  variant="text"
                >
                  <h3 className="text-xl">Login</h3>
                </Skeleton>
              </div>
            ) : !isLoggedIn ? (
              <Link
                to="/login"
                className="px-4 py-1.5 bg-blue-600 text-white rounded animate-fade-in hover:bg-blue-700 transition"
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
      <div className="py-7" aria-hidden="true" role="none"></div>
    </>
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
    <div className="relative z-50 animate-fade-in">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center gap-1 text-gray-300 cursor-pointer hover:text-blue-400 transition"
        ref={handleClickOutside}
      >
        {user?.user?.profile ? (
          <img
            src={user?.user.profile}
            alt={user?.user.name}
            className="size-7 rounded-full object-cover"
          />
        ) : (
          <div className="size-7 rounded-full bg-gray-100 text-blue-900 font-bold text-sm grid place-items-center">
            {user?.user?.name.split(" ")[0][0]}
            {user?.user?.name.split(" ")[1]?.[0] ?? ""}
          </div>
        )}
        {user?.user?.name.split(" ")[0]}
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
