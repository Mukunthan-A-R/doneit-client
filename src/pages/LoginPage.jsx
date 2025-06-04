import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/User";
import { useSetRecoilState } from "recoil";
import { userData } from "../data/atom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userData);

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await loginUser({
        email: email.toLowerCase(),
        password,
      });

      // console.log(response);
      const token = response.token;

      // Store token in local storage (optional, but used elsewhere)
      localStorage.setItem("x-auth-token", token);

      const userPayload = {
        token,
        user_id: response.user.user_id,
        name: response.user.name,
        email: response.user.email,
        loggedIn: true,
      };

      if (!response.user.is_activated) {
        setError("Please Activate your Account !");
        return;
      }

      // ✅ Update Recoil and let atom persist to localStorage
      setUser(userPayload);

      toast.success("Sign in successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false); // Set loading to false once the process is done
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative">
      <div className="max-w-4xl w-full bg-gray-50 rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center items-center bg-blue-900 text-white p-10">
          <h1 className="text-4xl font-extrabold mb-2">Done it</h1>
          <p className="text-blue-100 text-lg mb-4 italic">
            Your smart task companion
          </p>
          <p className="text-blue-100 text-center max-w-xs">
            Stay on track, meet deadlines, and accomplish more with your
            intelligent task tracker.
          </p>
        </div>

        <div className="flex flex-col justify-center px-8 py-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Sign in to Done it
          </h2>

          {error && (
            <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
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
              <Link
                to="/password-reset"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Signing In..." : "Sign In"}
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
