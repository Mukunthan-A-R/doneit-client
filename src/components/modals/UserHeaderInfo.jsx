// import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import LiveClock from "./LiveClock";
import SubscriptionStatus from "./SubscriptionStatus";

const UserHeaderInfo = () => {
  // const [location, setLocation] = useState({
  //   city: "",
  //   region: "",
  //   country: "",
  //   timezone: "",
  // });
  const {
    user: { user },
  } = useAuth();

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       const res = await fetch("https://ipapi.co/json");
  //       const data = await res.json();
  //       setLocation({
  //         city: data.city,
  //         region: data.region,
  //         country: data.country_name,
  //         timezone: data.timezone,
  //       });
  //     } catch (err) {
  //       console.error("Failed to fetch location:", err);
  //     }
  //   };

  //   // fetchLocation();
  // }, []);

  return (
    <div className="bg-white p-6 mb-6 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-blue-700">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold text-blue-900">
          Welcome Back, {user ? user.name : ""}
        </h1>
        {/* <p className="text-base font-bold text-gray-600">
          Location: {location.city}, {location.region} , {location.country}
        </p>
        <p className="text-base font-bold text-gray-600">
          Timezone: {location.timezone}
        </p> */}
        <SubscriptionStatus />
      </div>
      <LiveClock />
    </div>
  );
};

export default UserHeaderInfo;
