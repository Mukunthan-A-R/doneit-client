import React from "react";

const CreateProject = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      {" "}
      {/* Only applying blur effect */}
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full z-60">
        <h2 className="text-xl font-bold mb-4">Create Project</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="project-name"
              className="block text-sm font-semibold"
            >
              Project Name
            </label>
            <input
              type="text"
              id="project-name"
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="project-description"
              className="block text-sm font-semibold"
            >
              Project Description
            </label>
            <textarea
              id="project-description"
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
