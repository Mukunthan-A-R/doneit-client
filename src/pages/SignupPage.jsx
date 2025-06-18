import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../services/User";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
    company: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const { user, error: authError } = useAuth();

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    } else if (formData.first_name.length < 2) {
      newErrors.first_name = "First name must be at least 2 characters";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    } else if (formData.last_name.length < 2) {
      newErrors.last_name = "Last name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    } else if (formData.role.trim().length < 2) {
      newErrors.role = "Role must be at least 2 characters";
    }

    if (formData.company && formData.company.trim().length < 3) {
      newErrors.company = "Company name must be at least 3 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // If validation fails, prevent form submission

    const payload = {
      name: formData.first_name + " " + formData.last_name,
      email: formData.email.toLowerCase(),
      password: formData.password,
      role: formData.role,
      company: formData.company,
    };

    setLoading(true);

    try {
      const response = await registerUser(payload);
      console.log("User registered:", response);
      toast.success(
        "Registration successful! Activation Mail has been sent to your account !",
      );

      setTimeout(() => {
        navigate("/login");
      }, 3000);

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
        company: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authError && !user.requireLogin)
    return <ErrorHandler error={authError} />;

  if (user.user && user.user.user_id) return <Navigate to={"/dashboard"} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side Illustration */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-blue-900 text-white px-10 py-12">
          <h1 className="text-5xl font-extrabold mb-3 tracking-tight">
            Done it
          </h1>
          <p className="text-blue-100 text-lg mb-5 italic">
            Your smart task companion
          </p>
          <p className="text-blue-100 text-center max-w-xs leading-relaxed">
            Create an account and start organizing your life, one task at a
            time.
          </p>
          <img
            src="https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_640.jpg"
            alt="Signup illustration"
            className="mt-10 rounded-lg shadow-md"
          />
        </div>

        {/* Right Side Form */}
        <div className="flex flex-col justify-center px-8 py-12 sm:px-12">
          <h2 className="text-3xl font-semibold text-blue-900 mb-8">
            Create your Done it account
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border ${
                  errors.first_name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="John"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border ${
                  errors.last_name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                placeholder="Doe"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div
                className={` flex w-full px-4 py-2.5 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="outline-none flex flex-grow"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-600 hover:text-gray-800 ml-2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Designation
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border ${
                  errors.role ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                placeholder="e.g. Developer, Designer"
              />
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            {/* Company (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border ${
                  errors.company ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                placeholder="Your Company Name"
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-base font-semibold tracking-wide transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          {/* Already have an account */}
          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline transition"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
