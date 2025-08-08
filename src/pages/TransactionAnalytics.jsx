import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivitySummaryDashboard from "../components/ActivitySummaryDashboard";
import ProjectTitleCard from "../components/ProjectTitleCard";
import { fetchActivityLogs } from "../services/projectActivity";
import ErrorHandler from "../components/ErrorHandler";

const TransactionAnalytics = () => {
  const { projectId } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
        const result = await fetchActivityLogs(projectId);

        if (!result.success) {
          // If backend says 403 or other error, show that message as error
          setError(result.message || "Failed to fetch transactions.");
          setTransactions([]); // Clear previous data if any
        } else {
          setError(null);
          setTransactions(result.data); // Safe array from service
        }
      } catch (err) {
        // Network or unexpected error
        console.error("Error fetching transactions:", err);
        setError(err.message || "Failed to fetch transactions.");
        setTransactions([]);
        setError(response.message || "Failed to fetch transactions.");
      }

      setLoading(false);
    };

    getTransactions();
  }, [projectId]);

  return (
    <>
      {!error && <ProjectTitleCard project_id={projectId} />}

      {/* Show error if any */}
      {error ? (
        <ErrorHandler error={error}></ErrorHandler>
      ) : loading ? (
        <p className="mt-10 text-center text-blue-700 font-semibold text-lg">
          Loading activity logs...
        </p>
      ) : (
        <section className="mt-12 max-w-6xl mx-auto">
          <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
            <h1 className="text-2xl font-bold">Transaction Log Summary</h1>
          </header>

          <ActivitySummaryDashboard transactions={transactions} />
        </section>
      )}
    </>
  );
};

export default TransactionAnalytics;
