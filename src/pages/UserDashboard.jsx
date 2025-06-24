import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import ProjectProgressTime from "../components/ProjectProgressTime";
import StatsCards from "../components/modals/StatsCards.js";
import { userData } from "../data/atom";
import { fetchTasksByUserId } from "../services/miscService";
import SettingsPage from "../components/SettingsPage.jsx";
import useCollabProject from "../hooks/useCollabProjects.js";
import useProjectsByUser from "../hooks/useProjectsByUser.js";

const UserDashboard = () => {
  const { user } = useRecoilValue(userData);
  // const [completedProjects, setCompletedProjects] = useState(0);
  // const [overdueProjects, setOverdueProjects] = useState(0);
  const [todaysTasks, setTodaysTasks] = useState([]);

  let completedProjects = 0;
  let overdueProjects = 0;
  // Fetching Collab Projects
  const { project, isLoading } = useCollabProject(user.user_id);
  // Fetching User Projects
  const { project: userProjects, isLoading: isUserProjectsLoading } =
    useProjectsByUser(user.user_id);

  let allUserAssignedProjects = [
    ...(Array.isArray(project) ? project : []),
    ...(Array.isArray(userProjects) ? userProjects : []),
  ];

  // Filter ongoing projects
  const allOngoingProjects = allUserAssignedProjects.filter((project) => {
    const currentDate = new Date();
    const endDate = new Date(project.end_date);
    if (project.status === "completed") {
      completedProjects += 1;
    }
    if (project.status === "on-hold") {
      overdueProjects += 1;
    }
    return project.status === "active" && endDate >= currentDate;
  });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasksByUserId(user.user_id);
        setTodaysTasks(data.data || []);
      } catch (err) {
        console.error("Error fetching user tasks:", err.message);
      }
    };

    getTasks();
  }, [user.user_id]);

  if (isLoading || isUserProjectsLoading) {
    return (
      <div className="text-center py-6 text-gray-500 animate-pulse">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="relative flex overflow-hidden text-gray-800 font-sans">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* User Info Section */}
        <SettingsPage edit={false} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto pt-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[
              { title: "Projects Today", count: allOngoingProjects.length },
              {
                title: "Total Projects",
                count: allUserAssignedProjects.length,
              },
              { title: "Completed", count: completedProjects },
              {
                title: "Overdue",
                count: overdueProjects,
                color: "text-red-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 border-t-4 border-blue-700"
              >
                <h2 className="text-gray-700 text-lg font-semibold">
                  {item.title}
                </h2>
                <p className={`text-3xl mt-2 ${item.color || "text-blue-800"}`}>
                  {item.count}
                </p>
              </div>
            ))}
          </div>

          {/* Task List */}
          <StatsCards todaysTasks={todaysTasks} />

          {/* Ongoing Projects Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">
              Ongoing Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allOngoingProjects.length > 0 ? (
                allOngoingProjects.map((project) => (
                  <div
                    key={project.project_id}
                    className="bg-white p-4 rounded shadow border-l-4 border-blue-700"
                  >
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800">
                        {project.name}
                      </h3>
                      {/* Status Indicator */}
                      <span
                        className={`w-3 h-3 rounded-full ${
                          project.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Deadline:{" "}
                      {new Date(project.end_date).toLocaleDateString()}
                    </p>
                    <div>
                      {/* Status Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs ${
                          project.priority === "high"
                            ? "bg-red-500"
                            : project.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      >
                        {project.priority}
                      </span>
                    </div>
                    <ProjectProgressTime project={project} />
                  </div>
                ))
              ) : (
                <p>No ongoing projects</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
