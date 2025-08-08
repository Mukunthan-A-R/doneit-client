import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivitySummaryDashboard from "../components/ActivitySummaryDashboard";
import ProjectTitleCard from "../components/ProjectTitleCard";
import { fetchActivityLogs } from "../services/projectActivity";

const TransactionAnalytics = () => {
  const { projectId } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      const response = await fetchActivityLogs(projectId);

      console.log("Activity logs response:", response);

      if (response.status === 403) {
        // Forbidden: show message
        setTransactions(
          Array.isArray(response.data?.data) ? response.data.data : []
        );
        setError("You do not have permission to view these logs.");
      } else if (response.success) {
        setTransactions(
          Array.isArray(response.data?.data) ? response.data.data : []
        );
        setError(null);
      } else {
        setTransactions([]);
        setError(response.message || "Failed to fetch transactions.");
      }

      setLoading(false);
    };

    getTransactions();
  }, [projectId]);

  return (
    <>
      <ProjectTitleCard project_id={projectId} />

      {/* Error and Loading */}
      {loading && (
        <p className="mt-10 text-center text-blue-700 font-semibold text-lg">
          Loading activity logs...
        </p>
      )}

      {error && (
        <p
          className={`mt-10 text-center font-semibold text-lg ${
            error.includes("permission") ? "text-orange-600" : "text-red-600"
          }`}
        >
          {error}
        </p>
      )}

      {/* Activity Summary Section */}
      {!loading && (!error || error.includes("permission")) && (
        <section className="mt-12 max-w-6xl mx-auto">
          <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
            <h1 className="text-2xl font-bold">Transaction Log Summary</h1>
          </header>

          {error?.includes("permission") ? (
            <p className="text-center text-gray-500">
              You don’t have access to view detailed logs.
            </p>
          ) : (
            <ActivitySummaryDashboard transactions={transactions} />
          )}
        </section>
      )}
    </>
  );
};

export default TransactionAnalytics;
