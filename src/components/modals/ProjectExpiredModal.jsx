// src/components/common/ProjectExpiredModal.jsx
import { format } from "date-fns";

export default function ProjectExpiredModal({ plan, endDate, onClose }) {
  const formattedDate = endDate
    ? format(new Date(endDate), "MMMM d, yyyy")
    : "";

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-900">
            Your Trial Has Ended
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-gray-700 space-y-2">
          <p>
            Your <span className="font-semibold text-blue-900">{plan}</span>{" "}
            plan expired on <span className="font-medium">{formattedDate}</span>
            .
          </p>
          <p>
            To continue managing your projects and accessing your workspace,
            please upgrade to a paid plan.
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Remind Me Later
          </button>
          <a
            href="/settings"
            className="px-4 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-800 transition"
          >
            Upgrade Plan
          </a>
        </div>
      </div>
    </div>
  );
}
