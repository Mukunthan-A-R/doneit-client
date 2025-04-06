import React from "react";

const FormatProjects = ({ onCancel }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold">Confirmation</h3>
        <p className="my-4">Are you sure you want to Delete all projects?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onCancel(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            // onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormatProjects;
