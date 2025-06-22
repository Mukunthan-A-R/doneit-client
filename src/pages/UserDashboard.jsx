import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import EditUserModal from "../components/EditUserModal";
import ProjectProgressTime from "../components/ProjectProgressTime";
import StatsCards from "../components/modals/StatsCards.js";
import { userData } from "../data/atom";
import { fetchProjects } from "../services/ProjectServices";
import { fetchUserById } from "../services/UserData";
import { fetchTasksByUserId } from "../services/miscService";
import SettingsPage from "../components/SettingsPage.jsx";

const UserDashboard = () => {
  const { user } = useRecoilValue(userData);
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [overdueProjects, setOverdueProjects] = useState(0);
  const [todaysTasks, setTodaysTasks] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const projectData = await fetchProjects(user.user_id);
      setTotalProjects(projectData.data.length);

      if (projectData.status === 404) {
        console.error("Error: " + projectData.message);
        return;
      }

      // Filter ongoing projects
      const ongoingProjects = projectData.data.filter((project) => {
        const currentDate = new Date();
        const endDate = new Date(project.end_date);
        return project.status === "active" && endDate >= currentDate;
      });

      setProjects(ongoingProjects);

      // Calculate completed and overdue projects
      let completedCount = 0;
      let overdueCount = 0;

      projectData.data.forEach((project) => {
        const currentDate = new Date();
        const endDate = new Date(project.end_date);

        if (project.status === "completed") {
          completedCount++;
        } else if (project.status === "active" && endDate < currentDate) {
          overdueCount++;
        }
      });

      setCompletedProjects(completedCount);
      setOverdueProjects(overdueCount);
    };

    loadProjects();
  }, [user.user_id]);

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

  return (
    <div className="relative flex overflow-hidden text-gray-800 font-sans">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* User Info Section */}
        <SettingsPage></SettingsPage>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto pt-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[
              { title: "Projects Today", count: projects.length },
              { title: "Total Projects", count: totalProjects },
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
              {projects.length > 0 ? (
                projects.map((project) => (
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
