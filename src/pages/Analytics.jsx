import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import PieChart from "../components/PieChart";
import ProjectTitleCard from "../components/ProjectTitleCard";
import { ProjectState } from "../data/atom";
import useProjectTasks from "../hooks/useProjectTasks";
import ErrorHandler from "../components/ErrorHandler";

const Analytics = () => {
  const currentProject = useRecoilValue(ProjectState);

  const params = useParams();
  const project_id = params.projectId;

  const { tasks, isLoading, error } = useProjectTasks(project_id);

  const countTasksByStatus = () => {
    const counts = {
      remaining: 0,
      completed: 0,
      notStarted: 0,
    };

    tasks?.forEach((task) => {
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

  if (isLoading) {
    return (
      <div className="text-center py-6 text-gray-500 animate-pulse">
        Loading Analysis chart...
      </div>
    );
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  // if (tasks.length === 0) {
  //   return (
  //     <p className="flex flex-col justtify-center items-center p-40 text-green-800 text-lg sm:text-xl">
  //       New project created! Let’s add your first task to get things moving.
  //     </p>
  //   );
  // }

  const { remaining, completed, notStarted } = countTasksByStatus();
  const totalTasks = tasks?.length;
  const completionPercentage =
    totalTasks > 0 ? (completed / totalTasks) * 100 : 0;

  return (
    <>
      <ProjectTitleCard />

      <header className="bg-blue-950 text-white py-4 px-6 shadow-md flex items-center justify-between">
        <h1 className="text-2xl font-semibold"> Project Analytics</h1>
        <div className="text-sm font-medium opacity-80">
          Current Project: <span className="font-bold">{currentProject}</span>
        </div>
      </header>

      {tasks?.length === 0 ? (
        <p className="flex flex-col justtify-center items-center p-40 text-green-800 text-lg sm:text-xl">
          Nothing to analyze just yet! Add a task to your project and come back
          to see your progress.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-4">
                Task Distribution
              </h2>
              <PieChart tasks={tasks} />
            </div>

            {/* Statistics */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-6">
                Task Insights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                  label="Remaining Tasks"
                  value={remaining}
                  color="green"
                />
                <StatCard
                  label="Completed Tasks"
                  value={completed}
                  color="blue"
                />
                <StatCard
                  label="Not Started"
                  value={notStarted}
                  color="yellow"
                />
                <StatCard
                  label="Completion"
                  value={`${completionPercentage.toFixed(2)}%`}
                  color="purple"
                />
              </div>
            </div>
          </div>

          {/* Summary Table */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-700 pb-2 mb-4">
              Summary Overview
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-800">
                <thead className="bg-blue-900 text-white uppercase text-xs tracking-wider">
                  <tr>
                    <th className="text-left px-4 py-3">Metric</th>
                    <th className="text-left px-4 py-3">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-blue-50">
                    <td className="px-4 py-3 font-medium">Total Tasks</td>
                    <td className="px-4 py-3 text-blue-900 font-semibold">
                      {totalTasks}
                    </td>
                  </tr>
                  <tr className="even:bg-blue-50">
                    <td className="px-4 py-3 font-medium">Completed Tasks</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">
                      {completed}
                    </td>
                  </tr>
                  <tr className="even:bg-blue-50">
                    <td className="px-4 py-3 font-medium">Remaining Tasks</td>
                    <td className="px-4 py-3 text-yellow-700 font-semibold">
                      {remaining}
                    </td>
                  </tr>
                  <tr className="even:bg-blue-50">
                    <td className="px-4 py-3 font-medium">Not Started Tasks</td>
                    <td className="px-4 py-3 text-red-600 font-semibold">
                      {notStarted}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const StatCard = ({ label, value, color }) => {
  const colorMap = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div
      className={`p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 ${colorMap[color]}`}
    >
      <h4 className="text-md font-semibold">{label}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Analytics;
