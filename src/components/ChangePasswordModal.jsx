import React, { useState } from "react";
import { changePassword } from "../services/changePassword";

export default function ChangePasswordModal({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setError("");
    setMessage("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    const result = await changePassword(userId, currentPassword, newPassword);
    setLoading(false);

    if (result.success) {
      setMessage(result.message || "Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError(result.message || "Failed to change password.");
    }
  };

  if (!isOpen) {
    return (
      <section className="bg-white mt-6 p-6 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between border-l-4 border-blue-700">
        <div className="flex flex-col space-y-1 mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold text-blue-900">
            Change Password
          </h3>
          <p className="text-sm text-gray-600 max-w-md">
            Update your current password regularly to keep your account secure
            and protected.
          </p>
        </div>
        <button
          onClick={openModal}
          className="text-blue-700 hover:underline font-medium"
        >
          Change Password
        </button>
      </section>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={closeModal}
      >
        <div
          className="bg-white rounded shadow-lg max-w-md w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            aria-label="Close modal"
          >
            &#x2715;
          </button>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Change Password
          </h2>

          {error && (
            <div className="mb-4 text-red-600 bg-red-100 px-4 py-2 rounded">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 text-green-700 bg-green-100 px-4 py-2 rounded">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block mb-1 font-medium text-gray-700"
              >
                Your Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block mb-1 font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-medium text-gray-700"
              >
                Confirm Your New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
