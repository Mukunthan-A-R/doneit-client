import { useState } from "react";
import { toast } from "react-toastify";
import { submitContactMessage } from "../services/contact";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Clear the error on input change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    // Name: 3–30 characters
    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.length < 3 || form.name.length > 30) {
      newErrors.name = "Name must be between 3 and 30 characters.";
    }

    // Email: basic regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Message: 10–600 characters
    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (form.message.length < 10 || form.message.length > 600) {
      newErrors.message = "Message must be between 10 and 600 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await submitContactMessage(form); // ✅ Send to backend
      setSubmitted(true);
      setErrors({});
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send message:", error.message);
      toast.error(
        "Something went wrong while sending your message. Please try again."
      );
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col justify-center py-16 px-6 sm:px-12 md:px-24 lg:px-36">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left - Contact Info */}
        <div className="bg-blue-900 p-12 flex flex-col justify-center space-y-8">
          <h2 className="text-5xl font-extrabold text-white leading-tight tracking-wide">
            Get in Touch
          </h2>
          <p className="text-blue-200 text-lg max-w-md leading-relaxed">
            Have questions or want to collaborate? We're here to help. Send us a
            message and we'll respond as soon as possible.
          </p>

          <div className="space-y-6 text-blue-300 text-base">
            <div>
              <h3 className="font-semibold text-lg mb-1 text-white">
                Office Address
              </h3>
              <p>1234 Blue Street, Suite 567</p>
              <p>Cityville, ST 89012</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1 text-white">Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-1 text-white">Email</h3>
              <p>support@doneit.com</p>
            </div>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="p-12 bg-white flex flex-col justify-center">
          {submitted ? (
            <div className="text-center">
              <h3 className="text-3xl font-semibold text-blue-900 mb-4">
                Thank you!
              </h3>
              <p className="text-gray-700 mb-8">
                Your message has been received. We'll get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-xl transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-5 py-3 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-5 py-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className={`w-full px-5 py-3 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none`}
                ></textarea>
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Done It. All rights reserved.
      </footer>
    </section>
  );
}
