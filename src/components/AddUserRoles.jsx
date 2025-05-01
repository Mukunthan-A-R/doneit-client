import React, { useState, useEffect } from "react";
import { getUserByEmail } from "../services/UserEmail";

import { useParams } from "react-router-dom";
import { createAssignment } from "../services/collaboratorUserData";
import UserAssignmentsDisplay from "./UserAssignmentsDisplay";

const AddUserRoles = () => {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [userDetails, setUserDetails] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);

  const project_id = useParams();

  useEffect(() => {
    if (email) {
      const fetchUser = async () => {
        try {
          const data = await getUserByEmail(email.trim());
          setUserId(data.data.user_id);

          setUserDetails(data);
          setUserNotFound(false);
        } catch (error) {
          setUserDetails(null);
          setUserNotFound(true);
        }
      };
      fetchUser();
    } else {
      setUserDetails(null);
      setUserNotFound(false);
    }
  }, [email]);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleRoleChange = (event) => setRole(event.target.value);

  const handleAddUser = async (event) => {
    event.preventDefault();

    if (userDetails) {
      try {
        const newUser = {
          user_id: userId,
          project_id: project_id.projectId,
          role: role,
          status: "pending",
        };

        const response = await createAssignment(newUser);
        console.log("Assignment created successfully:", response);

        setEmail("");
        setRole("member");
        setUserDetails(null);
        setUserNotFound(false);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Add Users by Email & Role
      </h1>

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
              disabled={!userDetails}
              className={`w-full md:w-1/4 px-4 py-2 rounded-lg text-white ${
                userDetails
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add User
            </button>
          </div>

          {userNotFound && (
            <p className="text-red-500 text-sm mt-2">
              No user found with this email.
            </p>
          )}
          {userDetails && !userNotFound && (
            <p className="text-green-600 text-sm mt-2">User found!</p>
          )}
        </form>
        <UserAssignmentsDisplay projectId={project_id}></UserAssignmentsDisplay>
      </div>
    </div>
  );
};

export default AddUserRoles;
