import React, { useEffect, useState } from "react";
import { fetchActivityLogs } from "../services/projectActivity";
import TaskToolbar from "../components/TaskToolbar";
import { useRecoilValue } from "recoil";
import { ProjectState } from "../data/atom";
import { useParams } from "react-router-dom";
import ProjectTitleCard from "../components/ProjectTitleCard";
import ExportLogs from "../components/ExportLogs";

const TransactionHistory = () => {
  const currentProject = useRecoilValue(ProjectState);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { projectId } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedType, setSelectedType] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

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

  const isWithinDuration = (timestamp) => {
    if (selectedDuration === "all") return true;
    const now = new Date();
    const entryDate = new Date(timestamp);
    const durationMap = { "24h": 1, "7d": 7, "30d": 30 };
    const diffDays = (now - entryDate) / (1000 * 60 * 60 * 24);
    return diffDays <= durationMap[selectedDuration];
  };

  const filteredTransactions = transactions.filter((txn) => {
    const typeMatch = selectedType === "all" || txn.action === selectedType;
    const timeMatch = isWithinDuration(txn.timestamp);
    return typeMatch && timeMatch;
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col font-sans">
      {/* Mobile Navbar */}
      <div>
        <button
          onClick={() => setIsNavOpen(true)}
          className="lg:hidden bg-blue-900 text-white px-4 py-2 m-4 rounded z-20"
        >
          ☰ Menu
        </button>
      </div>

      {/* Sidebar Panel for Mobile */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white p-6 z-50 transform transition-transform duration-300 ease-in-out shadow-lg
          ${isNavOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
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

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar for desktop */}
        <aside className="hidden lg:block w-1/6 bg-blue-900 text-white p-4 shadow-lg min-h-screen">
          <h2 className="text-xl font-semibold">Task Toolbar</h2>
          <TaskToolbar project_id={projectId} />
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-10/12 px-4 py-6 max-w-7xl mx-auto">
          <ProjectTitleCard project_id={projectId} />

          <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
            <h1 className="text-2xl font-bold"> Project Logs</h1>
          </header>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow p-4 mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Action Type:
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All</option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="status-change">Status Change</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Time Range:
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Time</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          </div>

          {/* Transactions Table */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Transaction History
            </h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredTransactions.length === 0 ? (
              <p className="text-gray-600">No transactions match the filter.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow bg-white">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-blue-900 text-white">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Action</th>
                      <th className="px-6 py-3 font-semibold">Description</th>
                      <th className="px-6 py-3 font-semibold">
                        Date &amp; Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTransactions.map((txn, index) => (
                      <tr
                        key={txn.id || `${txn.timestamp}-${index}`}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50 transition`}
                      >
                        <td className="px-6 py-4 capitalize text-gray-900">
                          {txn.action}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {txn.description || txn.context || "—"}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {formatDate(txn.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <div className="flex justify-center mt-6">
            <ExportLogs transactions={transactions} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TransactionHistory;
