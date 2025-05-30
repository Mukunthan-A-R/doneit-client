import React, { useEffect, useState } from "react";
import { fetchActivityLogs } from "../services/projectActivity";
import TaskToolbar from "../components/TaskToolbar";
import { useRecoilValue } from "recoil";
import { ProjectState } from "../data/atom";
import { useParams } from "react-router-dom";
import ProjectTitleCard from "../components/ProjectTitleCard";

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
    const durationMap = {
      "24h": 1,
      "7d": 7,
      "30d": 30,
    };
    const days = durationMap[selectedDuration];
    const diffMs = now - entryDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays <= days;
  };

  const filteredTransactions = transactions.filter((txn) => {
    const typeMatch = selectedType === "all" || txn.action === selectedType;
    const timeMatch = isWithinDuration(txn.timestamp);
    return typeMatch && timeMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col font-sans">
      {/* Mobile Navbar Toggle */}
      <div className="lg:hidden px-4 py-3 bg-blue-900 text-white shadow">
        <button onClick={() => setIsNavOpen(true)} className="font-medium">
          ☰ Menu
        </button>
      </div>

      {/* Mobile Navbar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-blue-900 text-white p-4 z-30 transition-transform duration-300 ease-in-out 
        ${isNavOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={() => setIsNavOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>
        <TaskToolbar project_id={projectId} />
      </div>

      <div className="flex flex-grow flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="hidden lg:block w-1/6 bg-blue-900 text-white p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Task Toolbar</h2>
          <TaskToolbar project_id={projectId} />
        </aside>

        {/* Main Content */}
        <main className="p-6 w-full lg:w-10/12 max-w-7xl mx-auto">
          <ProjectTitleCard project_id={projectId} />

          {/* Filter Controls */}
          <div className="bg-white p-4 mt-6 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-4 items-center">
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
            <div className="flex flex-wrap gap-4 items-center">
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
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full text-sm text-left table-auto">
                  <thead className="bg-blue-900 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 font-semibold tracking-wide text-white">
                        Action
                      </th>
                      <th className="px-6 py-3 font-semibold tracking-wide text-white">
                        Description
                      </th>
                      <th className="px-6 py-3 font-semibold tracking-wide text-white">
                        Date &amp; Time
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {filteredTransactions.map((txn, index) => (
                      <tr
                        key={`${txn.id ?? ""}-${txn.timestamp}-${index}`}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50 transition`}
                      >
                        <td className="px-6 py-4 text-gray-900 capitalize">
                          {txn.action || "—"}
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
        </main>
      </div>
    </div>
  );
};

export default TransactionHistory;
