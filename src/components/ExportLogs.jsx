import React from "react";

const ExportLogs = ({ transactions }) => {
  const handleCSVExport = () => {
    const headers = ["Action", "Description", "Date & Time"];
    const rows = transactions.map((txn) => [
      `"${txn.action}"`,
      `"${txn.description}"`,
      `"${new Date(txn.timestamp).toLocaleString()}"`,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `activity_logs_${Date.now()}.csv`;
    link.click();
  };

  const handlePDFExport = () => {
    window.print(); // Optionally make a print-friendly version first
  };

  return (
    <div className="flex gap-4 mt-6">
      <button
        onClick={handleCSVExport}
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Export as CSV
      </button>
      <button
        onClick={handlePDFExport}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Print / Save as PDF
      </button>
    </div>
  );
};

export default ExportLogs;
