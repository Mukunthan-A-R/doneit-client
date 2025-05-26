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
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="w-full sm:max-w-xl bg-white border-2 border-red-700 text-red-700 font-semibold py-3 rounded-lg shadow-md hover:bg-red-700 hover:text-white transition duration-300"
          aria-label="Log out"
          title="Log out"
        >
          Log Out
        </button>
      </div>
    </section>
  );
};

export default LogoutButton;
