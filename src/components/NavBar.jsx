import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData } from "../data/atom";
import SandySoft from "../assets/SandySoft.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useRecoilState(userData);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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

  const isLoggedIn = !!user?.token;

  return (
    <nav className="bg-gray-800 text-white px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold flex justify-center items-center gap-3">
          <img className="w-15" src={SandySoft} alt="" />

          <Link to="/">
            <span className="text-3xl">D</span>
            one <span className="text-3xl">I</span>t
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>

          {!isLoggedIn ? (
            <Link to="/login" className="hover:text-gray-400">
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2"
              >
                <FaUserCircle className="text-2xl" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                  <Link
                    to="/user-dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    User Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={toggleMenu}
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
          >
            Dashboard
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/user-dashboard"
                onClick={toggleMenu}
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                User Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
