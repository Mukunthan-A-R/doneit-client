import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const PieChart = ({ tasks }) => {
  if (!Array.isArray(tasks)) {
    console.error("Expected tasks to be an array, but got:", tasks);
    return <p>No tasks data available</p>;
  }

  const countTasksByStatus = () => {
    const counts = {
      remaining: 0,
      completed: 0,
      notStarted: 0,
    };

    tasks.forEach((task) => {
      if (task.status === "not started") {
        counts.notStarted += 1;
      } else if (task.status === "in progress" || task.status === "pending") {
        counts.remaining += 1;
      } else if (task.status === "completed") {
        counts.completed += 1;
      }
    });

    return counts;
  };

  const { remaining, completed, notStarted } = countTasksByStatus();
  const total = remaining + completed + notStarted;

  const data = {
    labels: ["In Progress / Pending", "Completed", "Not Started"],
    datasets: [
      {
        label: "Task Status",
        data: [remaining, completed, notStarted],
        backgroundColor: ["#F59E0B", "#10B981", "#E11D48"],
        hoverOffset: 8,
        borderWidth: 2,
        cutout: "60%", // Donut effect
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 18,
          padding: 20,
          color: "#374151",
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${value} tasks (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto h-[300px] relative">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PieChart;
