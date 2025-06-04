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
      try {
        const response = await fetchActivityLogs(projectId);
        setTransactions(response.data || []);
        setError(null);
      } catch (err) {
        console.log("🚀 ~ getTransactions ~ err:", err);
        setError("Failed to fetch transactions.");
        setTransactions([]);
      } finally {
        setLoading(false);
      }
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
        <p className="mt-10 text-center text-red-600 font-semibold text-lg">
          {error}
        </p>
      )}

      {/* Activity Summary Section */}
      {!loading && !error && (
        <section className="mt-12 max-w-6xl mx-auto">
          <header className="bg-blue-950 text-white py-4 px-6 shadow rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
            <h1 className="text-2xl font-bold">Transaction Log Summary</h1>
          </header>

          <ActivitySummaryDashboard transactions={transactions} />

          {/* Export Logs could be placed here if needed */}
          {/* <div className="mt-8">
      <ExportLogs transactions={transactions} />
    </div> */}
        </section>
      )}
    </>
  );
};

export default TransactionAnalytics;
