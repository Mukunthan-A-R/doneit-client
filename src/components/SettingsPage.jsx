import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import EditUserModal from "./EditUserModal";

const SettingsPage = () => {
  const { isLoading, user, error } = useAuth();

  const [showEditModal, setShowEditModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (!isLoading && user.user) {
      setUserDetails(user.user);
    }
  }, [isLoading, user]);

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
          handleSetUserDetails={setUserDetails}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* User Info Section */}
      <section className="bg-white mt-6 p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between border-l-4 border-blue-700">
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
