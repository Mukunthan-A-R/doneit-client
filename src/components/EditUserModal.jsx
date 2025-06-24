import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { updateUserById } from "../services/UserData";

const EditUserModal = ({ onClose }) => {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user.user) {
      setFormData({
        name: user.user.name || "",
        email: user.user.email || "",
        company: user.user.company || "",
        role: user.user.role || "",
      });
    }
  }, [user, isLoading]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserById(user.user.user_id, formData);
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Failed to update user:", error);
      // Optionally show a message here
    } finally {
      refecthUserData();
      setSaving(false);
    }
  };

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="fixed inset-0 animate-fade-in backdrop-blur-sm flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-xl shadow-2xl transform transition-all duration-300 w-full max-w-lg p-4 pt-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
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
              disabled
              value={formData.email}
              onChange={handleChange}
              className="rounded-md border 0 p-2 bg-gray-100 text-gray-500 border-gray-300 px-3 py-2 w-full cursor-not-allowed"
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
      </div>
    </div>
  );
};

export default EditUserModal;
