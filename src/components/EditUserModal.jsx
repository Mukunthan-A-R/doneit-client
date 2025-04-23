import React, { useEffect, useState } from "react";
import { fetchUserById } from "../services/UserData";
import { updateUserById } from "../services/UserData"; // <-- Import here

const EditUserModal = ({ handleSetUserDetails, userId, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const response = await fetchUserById(userId);
        if (response.success && response.status === 200) {
          setUserDetails(response.data);
          setFormData({
            name: response.data.name || "",
            email: response.data.email || "",
            company: response.data.company || "",
            role: response.data.role || "",
          });
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      handleSetUserDetails({ ...formData });
      await updateUserById(userId, formData);
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Failed to update user:", error);
      // Optionally show a message here
    } finally {
      setSaving(false);
    }
  };

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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-blue-900 border-b pb-2 mb-4">
              Edit User Profile
            </h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800"
              >
                {saving ? "Saving..." : "Save Changes"}
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
