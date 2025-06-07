import React from "react";
import ReactDOM from "react-dom";

function ConfirmToast({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[320px] max-w-sm rounded-lg shadow-md bg-white border border-gray-200 animate-slide-in z-50">
      <div className="p-4">
        <p className="text-gray-800 font-medium">{message}</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function confirmComponent(message) {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const cleanup = () => {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
    };

    const handleConfirm = () => {
      cleanup();
      resolve(true);
    };

    const handleCancel = () => {
      cleanup();
      resolve(false);
    };

    ReactDOM.render(
      <ConfirmToast
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />,
      container
    );
  });
}
