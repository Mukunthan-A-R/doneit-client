import React, { useEffect, useState } from "react";

function gcd(a, b) {
  if (!b) return a;
  return gcd(b, a % b);
}

const GeneralSettingsPanel = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [browserInfo, setBrowserInfo] = useState("");
  const [resolution, setResolution] = useState({
    width: 0,
    height: 0,
  });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    // Set screen resolution once on mount (static)
    setResolution({
      width: window.screen.width,
      height: window.screen.height,
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent;
    let browser = "Unknown";
    let version = "";

    if (ua.includes("Chrome") && !ua.includes("Edg")) {
      browser = "Google Chrome";
      version = ua.match(/Chrome\/([\d.]+)/)?.[1];
    } else if (ua.includes("Edg")) {
      browser = "Microsoft Edge";
      version = ua.match(/Edg\/([\d.]+)/)?.[1];
    } else if (ua.includes("Firefox")) {
      browser = "Mozilla Firefox";
      version = ua.match(/Firefox\/([\d.]+)/)?.[1];
    } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
      browser = "Safari";
      version = ua.match(/Version\/([\d.]+)/)?.[1];
    }

    setBrowserInfo(`${browser} ${version}`);
  }, []);

  const handleZoom = (direction) => {
    setZoom((prev) => {
      let newZoom = direction === "in" ? prev + 0.1 : prev - 0.1;
      newZoom = Math.min(Math.max(newZoom, 0.5), 2);
      document.body.style.zoom = newZoom;
      return newZoom;
    });
  };

  // Calculate aspect ratio
  const divisor = gcd(resolution.width, resolution.height);
  const aspectWidth = resolution.width / divisor;
  const aspectHeight = resolution.height / divisor;

  return (
    <div className="w-full h-full overflow-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow border-l-4 border-blue-700 flex flex-col">
      <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center sm:text-left">
        System Preferences
      </h2>

      <div className="flex-1 space-y-6 text-sm sm:text-base">
        <SettingRow
          label="Current Date & Time"
          value={dateTime.toLocaleString()}
        />
        <SettingRow
          label="Time Zone"
          value={Intl.DateTimeFormat().resolvedOptions().timeZone}
        />
        <SettingRow label="Web Browser" value={browserInfo} />
        <SettingRow
          label="Display Resolution"
          value={
            resolution.width && resolution.height
              ? `${resolution.width} × ${resolution.height} px (Aspect Ratio: ${aspectWidth}:${aspectHeight})`
              : "Loading..."
          }
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="font-medium text-gray-800 w-40">Zoom Level</h3>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <button
              onClick={() => handleZoom("out")}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm"
            >
              − Decrease
            </button>
            <span className="text-gray-600 font-medium">
              {(zoom * 100).toFixed(0)}%
            </span>
            <button
              onClick={() => handleZoom("in")}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm"
            >
              ＋ Increase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
    <h3 className="font-medium text-gray-800 w-40">{label}</h3>
    <p className="text-gray-700">{value}</p>
  </div>
);

export default GeneralSettingsPanel;
