import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";

import { fetchProjects } from "../services/ProjectServices";
import UserSideMenu from "../components/UserSideMenu";

const UserDashboard = () => {
  const userDatas = useRecoilValue(userData);
  const [projects, setProjects] = useState([]);

  const [user, setUser] = useState({
    email: userDatas.email,
    name: userDatas.name,
    user_id: userDatas.user_id,
  });

  useEffect(() => {
    const loadProjects = async () => {
      const projectData = await fetchProjects(7); // fetch + get returned data
      setProjects(projectData); // store in state
    };

    loadProjects(projects);
  }, []);

  console.log(projects);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 text-gray-800 font-sans">
      {/* Sidebar */}
      <UserSideMenu></UserSideMenu>

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
                {user.name}
              </h2>
              <p className="text-sm text-gray-600">Project Manager</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button className="text-blue-700 hover:underline">
            Edit Profile
          </button>
        </section>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 pt-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[
              { title: "Tasks Today", count: 5 },
              { title: "Upcoming", count: 12 },
              { title: "Completed", count: 38 },
              { title: "Overdue", count: 3, color: "text-red-600" },
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
                {
                  title: "Design homepage wireframe",
                  due: "Today",
                },
                {
                  title: "Client feedback review",
                  due: "3:00 PM",
                },
                {
                  title: "Fix login validation bug",
                  due: "5:30 PM",
                },
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

          {/* Projects Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">
              Ongoing Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Redesign Website",
                  deadline: "April 30",
                  progress: 65,
                },
                {
                  name: "Mobile App Launch",
                  deadline: "May 15",
                  progress: 40,
                },
                {
                  name: "Marketing Campaign",
                  deadline: "May 1",
                  progress: 80,
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded shadow border-l-4 border-blue-700"
                >
                  <h3 className="font-semibold text-gray-800">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Deadline: {project.deadline}
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-700 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
