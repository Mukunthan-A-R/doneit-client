import React from "react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 font-sans p-4 pt-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Terms of Service
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            1. Introduction / Agreement to Terms
          </h2>
          <p>
            Welcome to <span className="font-semibold">Done It</span>. By
            accessing or using our services, you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not
            use our platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            2. User Eligibility
          </h2>
          <p>
            Done It is available to all users. By using our services, you
            confirm that you have the legal right to enter into this agreement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            3. Account Responsibilities
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            login credentials and for all activities under your account. Please
            notify us immediately if you suspect unauthorized use.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            4. Acceptable Use Policy
          </h2>
          <p>
            You agree not to misuse the services by attempting to crash,
            overload, or send harmful data to our servers. Such actions are
            strictly prohibited and may result in suspension or termination of
            your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            5. Payment and Refunds
          </h2>
          <p>
            Done It offers a monthly subscription plan after an initial free
            trial period. All payments are handled securely. Refunds, if any,
            are at the discretion of Done It and subject to applicable laws.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            6. Termination / Suspension of Accounts
          </h2>
          <p>
            We reserve the right to suspend or terminate accounts after
            verifying suspicious activity. User sessions and JWT tokens may be
            revoked to protect platform integrity.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            7. Disclaimer of Warranties
          </h2>
          <p>
            Done It is provided <em>"as is"</em> and <em>"as available"</em>{" "}
            without warranties of any kind, either express or implied. We do not
            guarantee uninterrupted or error-free service and disclaim liability
            for any damages arising from the use of our platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            8. Indemnification
          </h2>
          <p>
            You agree to indemnify, defend, and hold harmless Done It and its
            affiliates from any claims, damages, liabilities, or expenses
            arising from your misuse of the service or violation of these Terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            9. Changes to Terms
          </h2>
          <p>
            We may update these Terms periodically. Changes will be posted on
            this website, and continued use after updates constitutes acceptance
            of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            10. Contact Information
          </h2>
          <p>
            For questions or concerns, contact us at{" "}
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
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          aria-label="Go back to Home"
        >
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
};

export default TermsOfService;
