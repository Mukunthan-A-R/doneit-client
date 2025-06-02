import React from "react";

const ProjectCompletedToast = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="fixed top-6 right-6 z-50 max-w-sm w-full bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in-down"
      style={{
        animationDuration: "0.3s",
        animationTimingFunction: "ease-out",
        animationFillMode: "forwards",
        animationName: "slide-in-down",
      }}
    >
      <style>
        {`
          @keyframes slide-in-down {
            0% {
              transform: translateY(-20px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <svg
        className="w-6 h-6 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <p className="text-sm font-medium">
        Project marked as completed! Go to the Project Dashboard to see the
        changes.
      </p>
      <button
        onClick={onClose}
        className="ml-auto focus:outline-none hover:bg-green-700 rounded-full p-1"
        aria-label="Close notification"
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
  );
};

export default ProjectCompletedToast;
