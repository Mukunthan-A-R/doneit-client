import React, { useEffect, useState } from "react";
import { fetchActivityLogs } from "../services/projectActivity";
import TaskToolbar from "../components/TaskToolbar";
import { useRecoilValue } from "recoil";
import { ProjectState } from "../data/atom";
import { useParams } from "react-router-dom";
import ProjectTitleCard from "../components/ProjectTitleCard";
import ActivitySummaryDashboard from "../components/ActivitySummaryDashboard";
import ExportLogs from "../components/ExportLogs";

const TransactionAnalytics = () => {
  const currentProject = useRecoilValue(ProjectState);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { projectId } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetchActivityLogs(projectId);
        setTransactions(response.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch transactions.");
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, [projectId]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      {/* Navbar for mobile only with properly sized hamburger button */}
      <div>
        <button
          onClick={() => setIsNavOpen(true)}
          className="lg:hidden bg-blue-900 text-white px-4 py-2 m-4 rounded z-20"
        >
          ☰ Menu
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isNavOpen && (
        <div
          onClick={() => setIsNavOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel for Mobile */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white p-6 z-50 transform transition-transform duration-300 ease-in-out shadow-lg
    ${isNavOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
        // removed paddingTop style completely
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold tracking-wide m-0">
            Task Toolbar
          </h2>
          <button
            onClick={() => setIsNavOpen(false)}
            aria-label="Close menu"
            className="text-white text-3xl focus:outline-none focus:ring-2 focus:ring-white rounded"
          >
            &times;
          </button>
        </div>
        <TaskToolbar project_id={projectId} />
      </aside>

      {/* Main layout container */}
      <div className="flex flex-1 min-h-screen pt-14 lg:pt-0">
        {/* pt-14 (56px) padding-top on mobile only */}

        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex lg:flex-col lg:w-1/6 bg-blue-900 text-white p-4 shadow-lg">
          <h2 className="text-xl font-semibold tracking-wide ">Task Toolbar</h2>
          <TaskToolbar project_id={projectId} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-tl-3xl rounded-bl-3xl sm:pt-6 shadow-lg px-8 max-w-full overflow-x-auto">
          {/* Project Header */}
          <ProjectTitleCard project_id={projectId} />

          {/* Error and Loading */}
          {loading && (
            <p className="mt-10 text-center text-blue-700 font-semibold text-lg">
              Loading activity logs...
            </p>
          )}
          {error && (
            <p className="mt-10 text-center text-red-600 font-semibold text-lg">
              {error}
            </p>
          )}

          {/* Activity Summary Section */}
          {!loading && !error && (
            <section className="mt-12 max-w-6xl mx-auto">
              <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
                <h1 className="text-2xl font-bold">📋 Activity Summary</h1>
              </header>

              <ActivitySummaryDashboard transactions={transactions} />

              {/* Export Logs could be placed here if needed */}
              {/* <div className="mt-8">
                <ExportLogs transactions={transactions} />
              </div> */}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default TransactionAnalytics;
