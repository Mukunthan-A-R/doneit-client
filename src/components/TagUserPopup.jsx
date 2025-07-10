import { useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";

const TagUserPopup = ({ assignedUsers, taskId, onClose, onDeleteTag }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-xl shadow-2xl p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-auto relative border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Task Tags</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-red-500"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Input with Add button */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter user email or name to tag..."
            className="flex-grow border border-gray-300 rounded-md p-2"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => {
              if (inputValue.trim()) {
                alert(
                  `Tag "${inputValue}" to task ${taskId} (functionality not yet wired)`
                );
                setInputValue("");
              }
            }}
          >
            Add
          </button>
        </div>

        {/* Assigned Users Table */}
        {assignedUsers?.length > 0 ? (
          <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-100 text-left text-gray-700">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignedUsers.map((user) => (
                  <tr key={user.user_id} className="border-t">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => onDeleteTag(taskId, user.user_id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <MdDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No users tagged to this task.
          </p>
        )}
      </div>
    </div>
  );
};

export default TagUserPopup;
