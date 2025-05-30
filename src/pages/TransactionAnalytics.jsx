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
      {/* Mobile Navbar */}
      <header className="lg:hidden bg-blue-900 text-white shadow-md px-5 py-3 flex items-center justify-between sticky top-0 z-50">
        <h1 className="font-bold text-lg">WorkTrack Pro</h1>
        <button
          onClick={() => setIsNavOpen(true)}
          aria-label="Open menu"
          className="text-white text-2xl focus:outline-none focus:ring-2 focus:ring-white rounded"
        >
          ☰
        </button>
      </header>

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
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold tracking-wide">Menu</h2>
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

      <div className="flex flex-1 min-h-screen">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex lg:flex-col lg:w-1/5 bg-blue-900 text-white p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 tracking-wide">
            Task Toolbar
          </h2>
          <TaskToolbar project_id={projectId} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-tl-3xl rounded-bl-3xl shadow-lg p-8 max-w-full overflow-x-auto">
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
              <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-500 pb-3">
                Activity Summary
              </h2>

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
