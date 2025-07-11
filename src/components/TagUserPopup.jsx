import { useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";
import { getUserByEmail } from "../services/UserEmail";
import { useDebouncedCallback } from "../hooks/useDebounceCallback";
import { isAxiosError } from "axios";

const TagUserPopup = ({
  assignedUsers = [],
  taskId,
  onClose,
  onDeleteTag,
  onAddTag,
}) => {
  const [email, setEmail] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setUserDetails(null);
    setUserNotFound(false);
    handleSearchUser(val);
  };

  const handleAddClick = () => {
    if (!userDetails) return;
    onAddTag(userDetails, taskId, assignedUsers);
    setEmail("");
    setUserDetails(null);
    setUserNotFound(false);
  };

  const handleSearchUser = useDebouncedCallback(async (value) => {
    if (!value.trim()) return;

    try {
      setSearching(true);
      const response = await getUserByEmail(value.trim());
      setUserDetails(response.data);
      setUserNotFound(false);
    } catch (error) {
      if (isAxiosError(error) && error?.response?.status === 404) {
        setUserDetails(null);
        setUserNotFound(true);
      }
    } finally {
      setSearching(false);
    }
  }, 500);

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-xl shadow-2xl p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-auto relative border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tag Users to Task</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-red-500"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter user email"
            className="flex-grow border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleAddClick}
            disabled={!userDetails}
            className={`px-4 py-2 rounded-md text-white transition ${
              userDetails
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add
          </button>
        </div>

        {/* Status */}
        {searching && (
          <p className="text-gray-500 text-sm mb-2">Searching...</p>
        )}
        {userNotFound && !searching && (
          <p className="text-red-500 text-sm mb-2">
            No user found with that email.
          </p>
        )}
        {userDetails && !userNotFound && (
          <p className="text-green-600 text-sm mb-2">
            User found: {userDetails.name}
          </p>
        )}

        {/* Assigned Users */}
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
                        title="Remove User"
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
