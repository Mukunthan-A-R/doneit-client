import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const UserHeaderInfo = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState({
    city: "",
    region: "",
    country: "",
    timezone: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    // Timer to update current time
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch IP-based location
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json");
        const data = await res.json();
        setLocation({
          city: data.city,
          region: data.region,
          country: data.country_name,
          timezone: data.timezone,
        });
      } catch (err) {
        console.error("Failed to fetch location:", err);
      }
    };

    fetchLocation();
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
    <div className="bg-white p-6 mb-6 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-blue-700">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold text-blue-900">
          Welcome Back, {user ? user.name : ""}
        </h1>
        <p className="text-base font-bold text-gray-600">
          Location: {location.city}, {location.region}
        </p>
        <p className="text-base font-bold text-gray-600">
          Country: {location.country}
        </p>
        <p className="text-base font-bold text-gray-600">
          Timezone: {location.timezone}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xl font-semibold text-blue-800 pb-1">
          {formatTime(currentTime)}
        </p>
        <p className="text-sm text-gray-600">{formatDate(currentTime)}</p>
      </div>
    </div>
  );
};

export default UserHeaderInfo;
