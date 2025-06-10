import { createRoot } from "react-dom/client";

function ConfirmToast({ message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full backdrop-blur-sm z-50 grid place-items-center"
      id={"confirmation"}
    >
      <div className="p-4 w-[320px] max-w-sm rounded-lg shadow-md bg-white border border-gray-200 animate-slide-in">
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

    const domContainer = createRoot(container);

    const cleanup = () => {
      domContainer.unmount();
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

    domContainer.render(
      <ConfirmToast
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />,
    );
  });
}
