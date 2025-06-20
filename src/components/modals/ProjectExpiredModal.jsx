import { Link } from "react-router-dom";

export default function ProjectExpiredModal({ plan, endDate, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-blue-900">
              Your Trial Has Ended
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              You are currently on the{" "}
              <span className="font-semibold text-blue-800">{plan}</span> plan.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="mb-5">
          <div className="bg-gray-100 rounded-lg p-4 border text-sm">
            <p className="text-gray-700">
              Your access expired on{" "}
              <span className="font-medium text-blue-900">
                {new Date(endDate).toLocaleDateString()}
              </span>
              .
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-600 space-y-1">
              <li>Task features are now locked</li>
              <li>Project analytics unavailable</li>
              <li>Collaboration paused</li>
            </ul>
          </div>
          <p className="mt-4 text-gray-600 text-sm">
            To continue working on your projects, upgrade to a paid plan.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Maybe Later
          </button>
          <Link
            href="/pricing"
            className="px-5 py-2 text-sm rounded-md bg-blue-900 hover:bg-blue-800 text-white shadow-sm"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
}
