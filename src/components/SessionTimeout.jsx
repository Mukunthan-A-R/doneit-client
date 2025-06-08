import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

const SessionTimeout = () => {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const logoutUser = () => {
    toast.error("You have been logged out due to inactivity.");
    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    }, 1000);
  };

  const resetInactivityTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(logoutUser, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    // Start the initial timer
    resetInactivityTimer();

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      clearTimeout(timerRef.current);
    };
  }, []);

  return null;
};

export default SessionTimeout;
