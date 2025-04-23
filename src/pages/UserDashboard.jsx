import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";
import { fetchProjects } from "../services/ProjectServices";
import UserSideMenu from "../components/UserSideMenu";
import ProjectProgressTime from "../components/ProjectProgressTime";
import EditUserModal from "../components/EditUserModal";
import { fetchUserById } from "../services/UserData";

const UserDashboard = () => {
  const userDatas = useRecoilValue(userData);
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState(0); // New state for completed projects
  const [overdueProjects, setOverdueProjects] = useState(0); // New state for overdue projects
  const [showEditModal, setShowEditModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });

  const [user, setUser] = useState({
    email: userDatas.email,
    name: userDatas.name,
    user_id: userDatas.user_id,
  });

  useEffect(() => {
    const loadProjects = async () => {
      const projectData = await fetchProjects(userDatas.user_id); // fetch + get returned data
      setTotalProjects(projectData.data.length);

      if (projectData.status === 404) {
        // Handle the case when the fetch returns status 404
        console.error("Error: " + projectData.message);
        return;
      }

      // Filter ongoing projects
      const ongoingProjects = projectData.data.filter((project) => {
        const currentDate = new Date();
        const endDate = new Date(project.end_date);
        return project.status === "active" && endDate >= currentDate;
      });

      setProjects(ongoingProjects); // store the filtered 'ongoing' projects in state

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

      setCompletedProjects(completedCount); // Set the completed projects count
      setOverdueProjects(overdueCount); // Set the overdue projects count
    };

    loadProjects();
  }, [user.user_id]);

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const response = await fetchUserById(user.user_id);
        if (response.success && response.status === 200) {
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    loadUserDetails();
  }, [user.user_id, userDetails]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 text-gray-800 font-sans">
      {/* Sidebar */}
      <UserSideMenu></UserSideMenu>

      {showEditModal && (
        <EditUserModal
          handleSetUserDetails={(data) => {
            setUserDetails(data);
          }}
          userId={user.user_id}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* User Info Section */}
        <section className="bg-white mx-6 mt-6 p-6 rounded-lg shadow flex items-center justify-between border-l-4 border-blue-700">
          <div className="flex items-center space-x-4">
            <img
              className="h-16 w-16 rounded-full border-2 border-blue-700"
              src="https://i.pravatar.cc/100?img=2"
              alt="User"
            />
            <div>
              <h2 className="text-xl font-semibold text-blue-900">
                {userDetails.name}
              </h2>
              <p className="text-sm text-gray-600">
                {userDetails.role} ( {userDetails.company} )
              </p>
              <p className="text-sm text-gray-500">{userDetails.email}</p>
            </div>
          </div>
          <button
            className="text-blue-700 hover:underline"
            onClick={() => {
              setShowEditModal(true);
            }}
          >
            Edit Profile
          </button>
        </section>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 pt-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[
              { title: "Tasks Today", count: projects.length },
              { title: "Total Projects", count: totalProjects },
              { title: "Completed", count: completedProjects }, // Updated with completedProjects state
              {
                title: "Overdue",
                count: overdueProjects,
                color: "text-red-600",
              }, // Updated with overdueProjects state
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 border-t-4 border-blue-700"
              >
                <h2 className="text-gray-700 text-lg font-semibold">
                  {item.title}
                </h2>
                <p
                  className={`text-3xl mt-2 ${
                    item.color ? item.color : "text-blue-800"
                  }`}
                >
                  {item.count}
                </p>
              </div>
            ))}
          </div>

          {/* Task List */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-blue-800 text-white font-semibold text-lg">
              Today's Tasks
            </div>
            <ul className="divide-y divide-gray-200">
              {[
                { title: "Design homepage wireframe", due: "Today" },
                { title: "Client feedback review", due: "3:00 PM" },
                { title: "Fix login validation bug", due: "5:30 PM" },
              ].map((task, index) => (
                <li
                  key={index}
                  className="p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">Due: {task.due}</p>
                  </div>
                  <button className="text-blue-700 hover:underline">
                    Mark Done
                  </button>
                </li>
              ))}
            </ul>
          </div>

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
