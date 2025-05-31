import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const STORAGE_KEY = "done_it_session_key";

const SessionTimeout = ({ timeout = 15 * 60 * 1000 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const hasAuthToken = () => {
    return !!localStorage.getItem("x-auth-token");
  };

  const logout = () => {
    setShowPopup(true);

    setTimeout(() => {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("x-auth-token");
      localStorage.clear();
      navigate("/login");
    }, 2000);
  };

  const resetTimer = () => {
    if (!hasAuthToken()) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    const expiryTime = Date.now() + timeout;
    localStorage.setItem(STORAGE_KEY, expiryTime.toString());

    timerRef.current = setTimeout(logout, timeout);
  };

  useEffect(() => {
    if (!hasAuthToken()) return;

    const expiryTimeStr = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (expiryTimeStr) {
      const expiryTime = parseInt(expiryTimeStr, 10);
      const remainingTime = expiryTime - now;

      if (remainingTime <= 0) {
        logout();
      } else {
        timerRef.current = setTimeout(logout, remainingTime);
      }
    } else {
      resetTimer();
    }
  }, [location]);

  useEffect(() => {
    if (!hasAuthToken()) return;

    const events = ["mousemove", "keydown", "scroll", "click"];
    for (const event of events) {
      window.addEventListener(event, resetTimer);
    }

    return () => {
      for (const event of events) {
        window.removeEventListener(event, resetTimer);
      }
      clearTimeout(timerRef.current);
    };
  }, []);

  return showPopup ? (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg z-51 animate-fade flex items-center justify-between gap-4 min-w-[300px]">
      <span>Session ended. Please log in again.</span>
      <button
        onClick={() => setShowPopup(false)}
        className="text-white hover:text-gray-200 text-xl font-bold leading-none focus:outline-none"
      >
        &times;
      </button>
    </div>
  ) : null;
};

export default SessionTimeout;
