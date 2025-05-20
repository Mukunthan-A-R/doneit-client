import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";
import { fetchUserById } from "../services/UserData";
import EditUserModal from "./EditUserModal";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  const userDatas = useRecoilValue(userData);
  const token = localStorage.getItem("x-auth-token");

  const [showEditModal, setShowEditModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !userDatas?.user_id) return;

    const loadUserDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchUserById(userDatas.user_id);
        if (response.success && response.status === 200) {
          setUserDetails(response.data);
        } else if (response.status === "HTTP 401") {
          setError("Session expired - please log in again.");
        } else {
          setError("Could not fetch user details.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    loadUserDetails();
  }, [token, userDatas]);

  if (!token) {
    return (
      <div className="p-6 text-center text-gray-500">
        You are not logged in. Please{" "}
        <Link to="/login" className="text-blue-700 underline">
          sign in
        </Link>
        .
      </div>
    );
  }

  if (!userDatas?.user_id) {
    return (
      <div className="p-6 text-center text-gray-500">Loading session…</div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading user details…</div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  if (!userDetails) {
    return (
      <div className="p-6 text-center text-gray-500">
        No user details found.
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {showEditModal && (
        <EditUserModal
          handleSetUserDetails={setUserDetails}
          userId={userDatas.user_id}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* User Info Section */}
      <section className="bg-white mt-6 p-6 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between border-l-4 border-blue-700">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <img
            className="h-16 w-16 rounded-full border-2 border-blue-700"
            src="https://i.pravatar.cc/100?img=2"
            alt="User"
          />
          <div>
            <h2 className="text-xl font-semibold text-blue-900">
              {userDetails.name || "No Name"}
            </h2>
            <p className="text-sm text-gray-600">
              {userDetails.role || "No Role"} @{" "}
              {userDetails.company || "No Company"}
            </p>
            <p className="text-sm text-gray-500">
              {userDetails.email || "No Email"}
            </p>
          </div>
        </div>
        <button
          className="text-blue-700 hover:underline font-medium"
          onClick={() => setShowEditModal(true)}
        >
          Edit Profile
        </button>
      </section>
    </div>
  );
};

export default SettingsPage;
