import { useEffect, useState } from "react";
import {
  FaEdit,
  FaExchangeAlt,
  FaListAlt,
  FaPlusCircle,
  FaTrash,
  FaUserMinus,
  FaUserPlus,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import ExportLogs from "../components/ExportLogs";
import ProjectTitleCard from "../components/ProjectTitleCard";
import { fetchActivityLogs } from "../services/projectActivity";
import { toast } from "react-toastify";

const TransactionHistory = () => {
  const { projectId } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedType, setSelectedType] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetchActivityLogs(projectId);
        setTransactions(response.data || []);
        setError(null);
      } catch (err) {
        console.error("🚀 ~ getTransactions ~ err:", err);
        toast.error("Failed to fetch transactions.");
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

  const filteredTransactions = transactions
    .filter((txn) => {
      const typeMatch = selectedType === "all" || txn.action === selectedType;
      const timeMatch = isWithinDuration(txn.timestamp);
      return typeMatch && timeMatch;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.timestamp) - new Date(b.timestamp)
        : new Date(b.timestamp) - new Date(a.timestamp)
    );

  const getActionIcon = (action) => {
    switch (action) {
      case "create":
        return <FaPlusCircle className="text-green-600 inline mr-2" />;
      case "update":
        return <FaEdit className="text-yellow-600 inline mr-2" />;
      case "delete":
        return <FaTrash className="text-red-600 inline mr-2" />;
      case "status-change":
        return <FaExchangeAlt className="text-blue-600 inline mr-2" />;
      case "add-user":
        return <FaUserPlus className="text-green-700 inline mr-2" />;
      case "remove-user":
        return <FaUserMinus className="text-red-700 inline mr-2" />;
      default:
        return <FaListAlt className="text-gray-500 inline mr-2" />;
    }
  };

  return (
    <>
      <ProjectTitleCard project_id={projectId} />

      <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold">Project Logs</h1>
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
            <option value="add-user">Add User</option>
            <option value="remove-user">Remove User</option>
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

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Sort Order:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
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
                  <th className="px-6 py-3 font-semibold">Date &amp; Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((txn, index) => {
                  const match = txn.description?.match(/by (.*?) <(.*?)>/);
                  const username = match?.[1];
                  const email = match?.[2];
                  const beforeUser =
                    txn.description?.split(match?.[0])[0] + "by ";

                  return (
                    <tr
                      key={txn.id || `${txn.timestamp}-${index}`}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50 transition group`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 flex items-center space-x-3">
                        <span className="text-xl">
                          {getActionIcon(txn.action)}
                        </span>
                        <span className="capitalize text-blue-700 font-semibold">
                          {txn.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {beforeUser}
                        {username && (
                          <>
                            <span className="text-blue-800 font-semibold">
                              {username}
                            </span>{" "}
                            <span className="text-blue-700">
                              &lt;{email}&gt;
                            </span>
                          </>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(txn.timestamp)}
                      </td>
                    </tr>
                  );
                })}
                {transactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center py-8 text-gray-500 italic"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="flex justify-center mt-6">
        <ExportLogs transactions={transactions} />
      </div>
    </>
  );
};

export default TransactionHistory;
