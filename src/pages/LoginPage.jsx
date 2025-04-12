import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-gray-50 rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        {/* Left: Branding / Illustration */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-blue-900 text-white p-10">
          <h1 className="text-4xl font-extrabold mb-2">Done it</h1>
          <p className="text-blue-100 text-lg mb-4 italic">
            Your smart task companion
          </p>
          <p className="text-blue-100 text-center max-w-xs">
            Stay on track, meet deadlines, and accomplish more with your
            intelligent task tracker.
          </p>
          {/* <img
            src="https://via.placeholder.com/300x200?text=Task+Tracking"
            alt="Task tracking illustration"
            className="mt-8 rounded-md"
          /> */}
        </div>

        {/* Right: Login Form */}
        <div className="flex flex-col justify-center px-8 py-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Sign in to Done it
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
