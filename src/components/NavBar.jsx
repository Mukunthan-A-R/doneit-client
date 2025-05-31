import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useRecoilState } from "recoil";
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
    <nav className="fixed top-0 left-0 right-0 bg-[#0a1e3f] text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition"
                >
                  <FaUserCircle className="text-2xl" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#112240] text-white border border-gray-700 rounded shadow-lg z-50">
                    <Link
                      to="/user-dashboard"
                      className="block px-4 py-2 hover:bg-blue-800 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      User Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-blue-800 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-400 focus:outline-none"
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
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-[#0a1e3f] text-white">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={toggleMenu}
            className="block px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Dashboard
          </Link>
          {!isLoggedIn ? (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block px-4 py-2 bg-blue-600 rounded text-white text-center hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/user-dashboard"
                onClick={toggleMenu}
                className="block px-4 py-2 rounded hover:bg-blue-800 transition"
              >
                User Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 rounded hover:bg-blue-800 transition"
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
