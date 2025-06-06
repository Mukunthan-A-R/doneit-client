import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 font-sans p-4 pt-6 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Privacy Policy
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Introduction
          </h2>
          <p>
            Done It ("we", "us", or "our") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, and
            safeguard your information when you use our work management
            software.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Information We Collect
          </h2>
          <p>
            We collect basic information such as your name and email address
            during registration to provide and improve our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Data Sharing
          </h2>
          <p>
            We do not share your personal data with third parties. Your
            information is securely stored and handled with strict
            confidentiality.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Data Protection
          </h2>
          <p>
            We use end-to-end encryption and industry-standard security measures
            to protect your data from unauthorized access.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            User Rights
          </h2>
          <p>
            You have full rights to access, modify, or delete your data through
            our website. Any misuse of data will result in appropriate
            penalties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Children’s Privacy
          </h2>
          <p>
            Our platform is suitable for users of all ages. We do not knowingly
            collect personal information from children without consent.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Policy Updates
          </h2>
          <p>
            We may update this Privacy Policy from time to time. All changes
            will be posted on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Contact Information
          </h2>
          <p>
            For any privacy-related inquiries, please email us at{" "}
            <a
              href="mailto:sandysoft.official@gmail.com"
              className="text-blue-600 underline"
            >
              sandysoft.official@gmail.com
            </a>
            .
          </p>
        </section>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md transition-colors w-full sm:w-auto"
          aria-label="Go back to Home"
        >
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
