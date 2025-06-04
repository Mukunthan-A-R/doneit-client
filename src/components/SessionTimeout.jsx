import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const STORAGE_KEY = "done_it_session_key";

const SessionTimeout = ({ timeout = 15 * 60 * 1000 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  const hasAuthToken = () => {
    return !!localStorage.getItem("x-auth-token");
  };

  const logout = () => {
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
        toast.error("Session ended. Please log in again.");
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

  return null;
};

export default SessionTimeout;
