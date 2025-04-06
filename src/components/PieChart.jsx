import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register the necessary chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const PieChart = ({ tasks }) => {
  // Check if tasks are available
  if (!Array.isArray(tasks)) {
    console.error("Expected tasks to be an array, but got:", tasks);
    return <p>No tasks data available</p>;
  }

  // Count tasks by their status
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

  // Pie chart data
  const data = {
    labels: ["Remaining", "Completed", "Not Started"],
    datasets: [
      {
        label: "Task Status",
        data: [remaining, completed, notStarted],
        backgroundColor: ["#FFEB3B", "#4CAF50", "#FF5733"],
        borderColor: ["#FFEB3B", "#4CAF50", "#FF5733"],
        borderWidth: 1,
      },
    ],
  };

  // Pie chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label;
            const value = tooltipItem.raw;
            return `${label}: ${value} tasks`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
