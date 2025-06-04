import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData } from "../data/atom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [, setUser] = useRecoilState(userData);

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
    <section className="w-full mx-auto my-8 bg-white rounded-lg shadow-md border-l-4 border-blue-700 p-6">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center sm:text-left">
        User Account
      </h2>
      <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
        Securely log out from your account to protect your data. Once logged
        out, you will need to sign in again to access your projects and
        personalized settings.
      </p>
      <button
        onClick={handleLogout}
        className="w-full md:w-fit bg-red-500 text-white font-semibold px-3 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
        aria-label="Log out"
        title="Log out"
      >
        Log Out
      </button>
    </section>
  );
};

export default LogoutButton;
