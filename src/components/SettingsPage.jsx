import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";
import { fetchProjects } from "../services/ProjectServices";
import { fetchUserById } from "../services/UserData";
import { fetchTasksByUserId } from "../services/miscService";
import EditUserModal from "./EditUserModal";

const SettingsPage = () => {
  const userDatas = useRecoilValue(userData);
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
  }, [user.user_id]);

  return (
    <div>
      {showEditModal && (
        <EditUserModal
          handleSetUserDetails={(data) => {
            setUserDetails(data);
          }}
          userId={user.user_id}
          onClose={() => setShowEditModal(false)}
        />
      )}

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
    </div>
  );
};

export default SettingsPage;
