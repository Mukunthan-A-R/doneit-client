import { useState } from "react";
import useAuth from "../hooks/useAuth";
import EditUserModal from "./EditUserModal";

const SettingsPage = ({ edit = true }) => {
  const { isLoading, user, error, refetch } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  const userDetails = user.user || {};

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ").filter(Boolean);
    const first = parts[0]?.[0] || "";
    const second = parts[1]?.[0] || "";
    return (first + second).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-500">Loading user details…</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!userDetails) {
    return (
      <div className="text-center text-gray-500">No user details found.</div>
    );
  }

  return (
    <div className="w-full">
      {showEditModal && (
        <EditUserModal
          onClose={() => {
            setShowEditModal(false);
            refetch();
          }}
        />
      )}

      {/* User Info Section */}
      <section className="bg-white mt-6 p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between border-l-4 border-blue-700">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="text-xl rounded-full bg-gray-100 text-blue-900 font-bold flex items-center justify-center border-2 border-blue-700 h-16 w-16 ">
            {getInitials(userDetails.name)}
          </div>
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
        {edit && (
          <button
            className="text-blue-700 hover:underline font-medium"
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </button>
        )}
      </section>
    </div>
  );
};

export default SettingsPage;
