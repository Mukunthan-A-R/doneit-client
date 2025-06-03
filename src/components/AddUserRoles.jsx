import React, { useState, useEffect } from "react";
import { getUserByEmail } from "../services/UserEmail";
import { useParams } from "react-router-dom";
import {
  createAssignment,
  getAssignmentsByProjectId,
} from "../services/collaboratorUserData";
import UserAssignmentsDisplay from "./UserAssignmentsDisplay";

import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";
import { fetchProjectById } from "../services/ProjectServices";
import { fetchUserById } from "../services/UserData";
import { createActivityLog } from "../services/projectActivity";

const AddUserRoles = () => {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [userDetails, setUserDetails] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [reloadAssignments, setReloadAssignments] = useState(false); // Add a state to trigger re-fetching assignments
  const [userRole, setUserRole] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const { projectId } = useParams();

  const currentUserData = useRecoilValue(userData);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await getAssignmentsByProjectId(projectId);
        const ResData = response.data;

        let filterData = ResData.filter(
          (item) => item.user_id === parseInt(currentUserData.user_id)
        );

        if (response.success) {
          setUserRole(filterData[0].role);
          // console.log("filterData in the outer level");
          // console.log(filterData[0].role);
        }
      } catch (err) {
        // setError("Error fetching assignments");
      }
    };

    fetchAssignments();
  }, [projectId]);

  useEffect(() => {
    const fetchProjectBuId = async () => {
      try {
        const response = await fetchProjectById(projectId);
        const ProjectOwner = await fetchUserById(response.data.created);
        setOwnerEmail(ProjectOwner.data.email);
        if (ProjectOwner.data.user_id === currentUserData.user_id) {
          setUserRole("admin");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjectBuId();
  }, [projectId]);

  useEffect(() => {
    if (email) {
      const fetchUser = async () => {
        if (ownerEmail.trim() === email.trim()) {
          alert(
            `The email ${email.trim()} you are trying to add is the owner of the project ! \n
            You can't assign roles to owner of the Project !`
          );
          return;
        }
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
          project_id: projectId,
          role: role,
          status: "pending",
        };

        const response = await createAssignment(newUser);
        console.log("Assignment created successfully:", response);

        await createActivityLog({
          user_id: currentUserData.user_id, // who performed the action
          project_id: projectId,
          action: "add-user",
          context: {
            addedUserId: userId, // user id added
            addedUserEmail: userDetails.data.email, // real email
            addedUserName: userDetails.data.name, // real name
            addedUserRole: role,
          },
        });

        console.log(userDetails.data.email);
        console.log(userDetails.data.name);

        setReloadAssignments((prev) => !prev);

        setEmail("");
        setRole("member");
        setUserDetails(null);
        setUserNotFound(false);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  // console.log("userRole");
  // console.log(userRole);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!["member", "client", ""].includes(userRole) && (
        <>
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
          </div>
        </>
      )}
      {/* Pass the reloadAssignments state to UserAssignmentsDisplay to trigger re-fetch */}
      <UserAssignmentsDisplay
        projectId={projectId}
        userRole={userRole}
        reloadAssignments={reloadAssignments}
        setReloadAssignments={setReloadAssignments}
      />
    </div>
  );
};

export default AddUserRoles;
