import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!token) {
      setError("Missing token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("/api/password-reset/confirm", {
        token,
        password,
      });

      if (res.data.success) {
        setMessage("Password reset successfully. You can now log in.");
      } else {
        setError("Failed to reset password. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6 shadow-md">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold tracking-wide">Done it Services</h1>
        </div>
      </header>

      {/* Form container */}
      <main className="flex-grow flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Reset Password
          </h2>

          {error && (
            <p className="text-red-600 bg-red-100 p-3 rounded mb-4">{error}</p>
          )}
          {message && (
            <p className="text-green-700 bg-green-100 p-3 rounded mb-4">
              {message}
            </p>
          )}

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-1 text-gray-700 font-medium"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-gray-700 font-medium"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold py-3 rounded-md hover:bg-blue-800 transition"
          >
            Reset Password
          </button>
        </form>
      </main>

      {/* Footer (optional) */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Done it Services. All rights reserved.
      </footer>
    </div>
  );
}
