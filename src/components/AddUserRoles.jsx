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
import { createAssignment } from "../services/collaboratorUserData";

import UserAssignmentsDisplay from "./UserAssignmentsDisplay";
import ErrorHandler from "./ErrorHandler";
import useProjectAssignments from "../hooks/useProjectAssignments";

const AddUserRoles = () => {
  // External Data
  const { projectId } = useParams();
  const { project, error: projectError } = useProject(projectId);
  const { user: currentUserData, error: authError } = useRecoilValue(userData);

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [userRole, setUserRole] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [reloadAssignments, setReloadAssignments] = useState(false);
  const [owner, setOwner] = useState("");

  const {
    assignments,
    userRole: collabUseRole,
    isLoading,
    error,
    refetch,
  } = useProjectAssignments(projectId, currentUserData.user_id);

  useEffect(() => {
    setUserRole(collabUseRole);
  }, [collabUseRole]);

  // Effects: Fetch Project Owner
  useEffect(() => {
    const fetchProjectOwner = async () => {
      setLoading(true);
      try {
        const response = await fetchUserById(project?.created);
        const projectOwner = response.data;
        setOwner(projectOwner);

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

  // Debounced Email Search
  const handleSearchUser = useDebouncedCallback((email) => {
    if (!email) {
      setUserDetails(null);
      setUserNotFound(false);
      return;
    }

    if (owner.email.trim() === email.trim()) {
      toast.error("You can't add the project owner.");
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
        addedUserEmail: userDetails.data.email,
        addedUserName: userDetails.data.name,
        projectName: project.name,
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

      refetch();
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
        owner={owner}
        assignments={assignments}
        currentUserData={currentUserData}
        userRole={userRole}
        reloadAssignments={reloadAssignments}
        setReloadAssignments={setReloadAssignments}
        refetch={refetch}
      />
    </div>
  );
};

export default AddUserRoles;
