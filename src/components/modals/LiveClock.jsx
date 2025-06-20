// components/common/LiveClock.js
import { useEffect, useState } from "react";

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const formatDate = (date) =>
    date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="text-right">
      <p className="text-xl font-semibold text-blue-800 pb-1">
        {formatTime(currentTime)}
      </p>
      <p className="text-sm text-gray-600">{formatDate(currentTime)}</p>
    </div>
  );
};

export default LiveClock;
