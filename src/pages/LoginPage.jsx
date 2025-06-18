import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, user, error: authError, login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true when form is submitted

    try {
      const loginState = await login(email, password);
      if (loginState.success) navigate("/dashboard");
      else throw loginState.error;
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err);
    } finally {
      setLoading(false); // Set loading to false once the process is done
    }
  };

  if (authError && !user.requireLogin)
    return <ErrorHandler error={authError} />;

  return (
    <div className="h-[90dvh] bg-white flex items-center justify-center px-4 py-12 relative">
      <div className="max-w-4xl w-full bg-gray-50 rounded-2xl shadow-xl overflow-hidden grid transition lg:grid-cols-2">
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

        {isLoading ? (
          <div className="px-8 py-12 text-2xl font-bold text-gray-600">
            Loading...
          </div>
        ) : (
          <div className="flex flex-col justify-center px-8 py-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Sign in to Done it
            </h2>

            {error && (
              <div className="mb-4 text-red-600 text-sm font-medium">
                {error}
              </div>
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
                <div className="flex justify-between mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="outline-none flex flex-grow"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-600 hover:text-gray-800 ml-2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end text-sm">
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
        )}
      </div>
    </div>
  );
};

export default LoginPage;
