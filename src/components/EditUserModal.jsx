import React, { useEffect, useState } from "react";
import { fetchUserById } from "../services/UserData";

const EditUserModal = ({ userId, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const response = await fetchUserById(userId);
        if (response.success && response.status === 200) {
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUserDetails();
    }
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl transform transition-all duration-300 w-full max-w-lg p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : userDetails ? (
          <form className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900 border-b pb-2 mb-4">
              Edit User Profile
            </h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={userDetails.name}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-600 focus:ring focus:ring-blue-100 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={userDetails.email}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-600 focus:ring focus:ring-blue-100 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                defaultValue={userDetails.company}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-600 focus:ring focus:ring-blue-100 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                defaultValue={userDetails.role || ""}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-600 focus:ring focus:ring-blue-100 transition"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800 shadow-sm transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-red-500">User not found.</p>
        )}
      </div>
    </div>
  );
};

export default EditUserModal;
