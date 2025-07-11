import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

import { useDebouncedCallback } from "../hooks/useDebounceCallback";
import useProject from "../hooks/useProject";
import { userData } from "../data/atom";
import { fetchUserById } from "../services/UserData";
import { getUserByEmail } from "../services/UserEmail";
import { createActivityLog } from "../services/projectActivity";
import {
  createAssignment,
  getAssignmentsByProjectId,
} from "../services/collaboratorUserData";

import UserAssignmentsDisplay from "./UserAssignmentsDisplay";
import ErrorHandler from "./ErrorHandler";

const AddUserRoles = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [userDetails, setUserDetails] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [reloadAssignments, setReloadAssignments] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [assignments, setAssignments] = useState(null);

  // External Data
  const { projectId } = useParams();
  const { project, error: projectError } = useProject(projectId);
  const { user: currentUserData, error: authError } = useRecoilValue(userData);

  // Effects: Fetch Project Owner
  useEffect(() => {
    const fetchProjectOwner = async () => {
      setLoading(true);
      try {
        const response = await fetchUserById(project?.created);
        const projectOwner = response.data;
        setOwnerEmail(projectOwner.email);

        if (projectOwner.user_id === currentUserData.user_id) {
          setUserRole("admin");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching project owner");
      } finally {
        setLoading(false);
      }
    };

    if (project?.created) fetchProjectOwner();
  }, [projectId, project?.created]);

  // Effects: Fetch Assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const response = await getAssignmentsByProjectId(projectId);
        const assignmentsData = response.data;

        if (response.status === 404) {
          setAssignments([]);
          return;
        }

        setAssignments(assignmentsData);

        const currentUserAssignment = assignmentsData.find(
          (a) => a.user_id === parseInt(currentUserData.user_id)
        );

        if (currentUserAssignment) {
          setUserRole(currentUserAssignment.role);
        }
      } catch (err) {
        console.error("🚀 ~ fetchAssignments ~ err:", err);
        toast.error("Error fetching assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [projectId, reloadAssignments]);

  // Debounced Email Search
  const handleSearchUser = useDebouncedCallback((email) => {
    if (!email) {
      setUserDetails(null);
      setUserNotFound(false);
      return;
    }

    if (ownerEmail.trim() === email.trim()) {
      toast.error(
        `The email ${email.trim()} you are trying to add is the owner of the Project!`
      );
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getUserByEmail(email.trim());
        setUserId(userData.data.user_id);
        setUserDetails(userData);
        setUserNotFound(false);
      } catch (error) {
        if (isAxiosError(error) && error.status === 404) {
          setUserDetails(null);
          setUserNotFound(true);
        }
      }
    };

    fetchUser();
  }, 500);

  // Event Handlers
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    handleSearchUser(value);
  };

  const handleRoleChange = (e) => setRole(e.target.value);

  const checkExistingUser = (userId) => {
    if (!assignments?.length) return false;
    return assignments.some((user) => user.user_id === userId);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (checkExistingUser(userId)) {
      toast.error("The user already exists!");
      return;
    }

    if (!userDetails) return;

    try {
      const newUser = {
        user_id: userId,
        project_id: projectId,
        role,
        status: "pending",
      };

      await createAssignment(newUser);

      await createActivityLog({
        user_id: currentUserData.user_id,
        project_id: projectId,
        action: "add-user",
        context: {
          addedUserId: userId,
          addedUserEmail: userDetails.data.email,
          addedUserName: userDetails.data.name,
          addedUserRole: role,
        },
      });

      setReloadAssignments((prev) => !prev);
      setEmail("");
      setRole("member");
      setUserDetails(null);
      setUserNotFound(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // UI Rendering
  if (loading) return <p>Loading ...</p>;
  if (projectError || authError)
    return <ErrorHandler error={projectError || authError} />;

  return (
    <div className="max-w-4xl mx-auto">
      {["admin", "manager"].includes(userRole) && (
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

      {/* Assignment Display */}
      <UserAssignmentsDisplay
        assignments={assignments}
        currentUserData={currentUserData}
        userRole={userRole}
        reloadAssignments={reloadAssignments}
        setReloadAssignments={setReloadAssignments}
      />
    </div>
  );
};

export default AddUserRoles;
