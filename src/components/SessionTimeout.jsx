import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SessionTimeout = ({ timeout = 15 * 60 * 1000 }) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // Reset timer
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, timeout);
  };

  // Logout function
  const logout = () => {
    alert("Session expired due to inactivity.");
    // Clear session, tokens, etc.
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    // Start the timer when component mounts
    resetTimer();

    // Events that count as activity
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

  return null; // This component doesn't render anything
};

export default SessionTimeout;
