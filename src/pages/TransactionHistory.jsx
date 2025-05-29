import React, { useEffect, useState } from "react";
import { fetchActivityLogs } from "../services/projectActivity"; // import your actual fetch fn
import TaskToolbar from "../components/TaskToolbar";
import { useRecoilValue } from "recoil";
import { ProjectState } from "../data/atom";
import { useParams } from "react-router-dom";
import ProjectTitleCard from "../components/ProjectTitleCard";

const TransactionHistory = () => {
  const currentProject = useRecoilValue(ProjectState);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const params = useParams();
  const project_id = params.projectId;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetchActivityLogs(project_id);
        // response = { success: true, data: [...] }
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
  }, [project_id]);

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
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      {/* Responsive Navbar Toggle */}
      <div>
        <button
          onClick={() => setIsNavOpen(true)}
          className="lg:hidden bg-blue-900 text-white px-4 py-2 m-4 rounded z-20"
        >
          ☰ Menu
        </button>
      </div>

      {/* Responsive Navbar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-blue-900 text-white p-4 z-30 transform transition-transform duration-300 ease-in-out 
        ${isNavOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Dashboard Menu</h2>
          <button
            onClick={() => setIsNavOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>
        <TaskToolbar project_id={project_id} />
      </div>

      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Sidebar */}
        <div className={`lg:block w-1/6 bg-blue-900 p-4 hidden lg:block`}>
          <h2 className="text-white text-xl font-medium">Task Toolbar</h2>
          <TaskToolbar project_id={project_id} />
        </div>

        {/* Main Content */}
        <main className="p-6 w-full lg:w-10/12">
          {/* Project Title Card */}
          <ProjectTitleCard project_id={project_id} />

          {/* Transactions Section */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Transaction History
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading transactions...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : transactions.length === 0 ? (
              <p className="text-gray-600">No transactions found.</p>
            ) : (
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((txn, index) => (
                      <tr
                        key={`${txn.id ?? ""}-${txn.timestamp}-${
                          txn.user ?? ""
                        }-${index}`}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {txn.action || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {txn.description || txn.context || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
