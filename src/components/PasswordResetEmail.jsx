import React, { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../services/passwordReset"; // Adjust the path if needed

export default function PasswordResetEmail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await requestPasswordReset(email);
      setMessage(
        res.message ||
          `If an account exists for ${email}, a reset link has been sent.`
      );
    } catch (err) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <main className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Reset your password
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium py-2 px-4 rounded-md transition duration-150`}
            >
              {loading ? "Sending..." : "Send password reset email"}
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 text-sm text-green-600 text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 text-sm text-red-600 text-center">{error}</div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-blue-600 hover:underline">
            Back to sign in
          </Link>
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 DoneIt, Inc.
      </footer>
    </div>
  );
}
