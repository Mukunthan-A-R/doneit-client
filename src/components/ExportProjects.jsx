import React, { useEffect, useState } from "react";
import { fetchProjects } from "../services/ProjectServices";
import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";

const convertToCSV = (data) => {
  if (!data || data.length === 0) return "";

  const keys = Object.keys(data[0]);
  const csvRows = [];

  csvRows.push(keys.join(","));

  data.forEach((item) => {
    const values = keys.map((key) => {
      let val = item[key] === null || item[key] === undefined ? "" : item[key];
      val = val.toString().replace(/"/g, '""'); // escape quotes
      return `"${val}"`;
    });
    csvRows.push(values.join(","));
  });

  return csvRows.join("\n");
};

const ExportProjects = () => {
  const currentUserData = useRecoilValue(userData);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserId = parseInt(currentUserData?.user_id);

  useEffect(() => {
    const getProjects = async () => {
      if (!currentUserId) return;
      setLoading(true);
      try {
        const response = await fetchProjects(currentUserId);
        setProjects(response.data || []);
        // setProjects([]);
        setError(null);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setProjects([]); // no projects found
        } else {
          setError(err.message || "Failed to fetch projects");
        }
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [currentUserId]);

  const handleDownload = () => {
    if (!projects || projects.length === 0) {
      alert("No projects to export!");
      return;
    }
    const csv = convertToCSV(projects);
    const blob = new Blob([csv], { type: "text/csv" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = "projects_export.csv";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <section className="w-full bg-white rounded-lg shadow-md p-2 border-l-4 border-blue-700 mt-8 px-6">
      <h2 className="text-2xl font-semibold text-blue-900 mb-1">
        Export Projects Data
      </h2>

      {loading ? (
        <p className="text-blue-600 font-semibold">Loading projects...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold">Error: {error}</p>
      ) : projects.length > 0 ? (
        <div>
          <p className="mb-6 w-full text-gray-700 text-sm  leading-relaxed">
            You can download all your projects’ data in CSV format. This file
            can be easily opened with spreadsheet applications like Microsoft
            Excel or Google Sheets, allowing you to review, analyze, or share
            your project information efficiently. Click the button below to
            start the download.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleDownload}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              aria-label="Export projects to CSV"
              title="Export projects to CSV"
            >
              Projects to CSV
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">
          No projects available for export.
        </p>
      )}
    </section>
  );
};

export default ExportProjects;
