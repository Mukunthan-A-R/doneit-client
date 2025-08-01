import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA", "#93C5FD"];

const ActivitySummaryDashboard = ({ transactions }) => {
  // Count by action type
  const countByAction = transactions.reduce((acc, txn) => {
    const action = txn.action || "unknown";
    acc[action] = (acc[action] || 0) + 1;
    return acc;
  }, {});

  // ✅ Count by user email extracted from description like <user@example.com>
  const countByUserEmail = transactions.reduce((acc, txn) => {
    const match = txn.description?.match(/<([^>]+)>/); // extract email inside < >
    const email = match?.[1] || "unknown@example.com";
    acc[email] = (acc[email] || 0) + 1;
    return acc;
  }, {});

  // Count by task name
  const countByTask = transactions.reduce((acc, txn) => {
    let task = "Unknown";

    if (txn.action === "status-change") {
      const match = txn.description?.match(/for task "([^"]+)"/);
      if (match) task = match[1];
    } else {
      const match = txn.description?.match(/task "?(.+?)"? (by|to)/);
      if (match) task = match[1];
    }

    acc[task] = (acc[task] || 0) + 1;
    return acc;
  }, {});

  const actionData = Object.entries(countByAction).map(([name, value]) => ({
    name,
    value,
  }));

  const userData = Object.entries(countByUserEmail).map(([email, count]) => ({
    name: email,
    count,
  }));

  const taskData = Object.entries(countByTask).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart - Actions Distribution */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-gray-700">
            Actions Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={actionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {actionData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Most Active Users */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <h3 className="text-lg font-medium mb-2 text-gray-700">
              Most Active Users
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tickFormatter={(email) =>
                    email.length > 10 ? email.slice(0, 10) + "…" : email
                  }
                />

                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#1E3A8A" barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bar Chart - Action Counts */}
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <h3 className="text-lg font-medium mb-2 text-gray-700">
            Action Counts
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={actionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#60A5FA" barSize={45} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ActivitySummaryDashboard;
