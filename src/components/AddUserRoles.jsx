// src/components/AddUserRoles.jsx

import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi"; // For Edit and Delete icons

const AddUserRoles = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [users, setUsers] = useState([]);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleRoleChange = (event) => setRole(event.target.value);

  const handleAddUser = (event) => {
    event.preventDefault();

    if (email && !users.some((user) => user.email === email)) {
      setUsers([
        ...users,
        { email, role, addedAt: new Date().toLocaleString() },
      ]);
      setEmail("");
      setRole("member");
    }
  };

  const handleDeleteUser = (email) => {
    setUsers(users.filter((user) => user.email !== email));
  };

  const handleEditUser = (email) => {
    const userToEdit = users.find((user) => user.email === email);
    if (userToEdit) {
      setEmail(userToEdit.email);
      setRole(userToEdit.role);
      handleDeleteUser(email); // Remove the user from the list to edit
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Add Users by Email & Role
      </h1>

      {/* Add User Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="flex flex-col md:flex-row items-center space-x-4 space-y-4 md:space-y-0">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg"
              placeholder="Enter user's email"
              required
            />
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full md:w-1/4 p-2 border border-gray-300 rounded-lg"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="member">Member</option>
              <option value="client">Client</option>
            </select>
            <button
              type="submit"
              className="w-full md:w-1/4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* Display Users */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Added Users</h2>
        <div className="mt-4 space-y-4">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-50 shadow-lg rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out"
              >
                <div>
                  <div className="text-lg font-semibold">{user.email}</div>
                  <div className="text-sm text-gray-500">{user.role}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {user.addedAt}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditUser(user.email)}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                    aria-label="Edit user"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.email)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    aria-label="Delete user"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500">No users added yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUserRoles;
