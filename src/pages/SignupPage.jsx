import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { registerUser } from "../services/User"; // Import the registerUser function

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
  const [loading, setLoading] = useState(false); // Loading state to show a loader
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [errorMessage, setErrorMessage] = useState(""); // Error message

  const navigate = useNavigate(); // Initialize useNavigate for redirection

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
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // If validation fails, prevent form submission

    const payload = {
      name: formData.first_name + " " + formData.last_name,
      // last_name: formData.last_name,
      email: formData.email.toLowerCase(),
      password: formData.password,
      role: formData.role,
      company: formData.company,
    };

    setLoading(true); // Set loading to true when submitting
    setSuccessMessage(""); // Clear any previous success messages
    setErrorMessage(""); // Clear any previous error messages

    try {
      const response = await registerUser(payload); // Send data using the registerUser function
      console.log("User registered:", response);
      setSuccessMessage(
        "Registration successful! Activation Mail has been sent to your account !"
      ); // Set success message

      // Show success popup for 1 second and redirect
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 3000);

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
        company: "",
      }); // Clear form after successful submission
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage(
        error.response.data.message ||
          error.response.data ||
          "An error occurred during registration. Please try again."
      ); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

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
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                placeholder="••••••••"
              />
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

          {/* Success/Error Messages */}
          {successMessage && (
            <p className="text-green-600 text-sm mt-4 text-center">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-sm mt-4 text-center">
              {errorMessage}
            </p>
          )}

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
