import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByEmail } from "../services/UserEmail";
import {
  createAssignment,
  getAssignmentsByProjectId,
} from "../services/collaboratorUserData";
import UserAssignmentsDisplay from "./UserAssignmentsDisplay";

import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";
import { useDebouncedCallback } from "../hooks/useDebounceCallback";
import useProject from "../hooks/useProject";
import { fetchUserById } from "../services/UserData";
import { createActivityLog } from "../services/projectActivity";
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

  const { projectId } = useParams();
  const { project } = useProject(projectId);

  const { user: currentUserData } = useRecoilValue(userData);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const ProjectOwner = await fetchUserById(project?.created);
        setOwnerEmail(ProjectOwner.data.email);
        if (ProjectOwner.data.user_id === currentUserData.user_id) {
          setUserRole("admin");
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        toast.error("Error fetching assignments");
        setLoading(false);
      }
    };

    if (project?.created) fetchProjectDetails();
  }, [projectId, project?.created]);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const response = await getAssignmentsByProjectId(projectId);
        const ResData = response.data;

        if (response.status === 404) {
          setAssignments([]);
          setLoading(false);
          return;
        }
        setAssignments(ResData);

        let filterData = ResData.filter(
          (item) => item.user_id === parseInt(currentUserData.user_id)
        );

        if (filterData.length > 0) {
          setUserRole(filterData[0].role);
          setLoading(false);
        } else {
          setLoading(false);
          return;
        }
      } catch (err) {
        setLoading(false);
        console.log("🚀 ~ fetchAssignments ~ err:", err);
        toast.error("Error fetching assignments");
      }
    };

    fetchAssignments();
  }, [projectId, reloadAssignments]);

  const handleSearchUser = useDebouncedCallback((email) => {
    if (email) {
      const fetchUser = async () => {
        if (ownerEmail.trim() === email.trim()) {
          toast.error(
            `The email ${email.trim()} you are trying to add is the owner of the Project ! `
          );
          return;
        }
        try {
          const data = await getUserByEmail(email.trim());
          setUserId(data.data.user_id);
          setUserDetails(data);
          setUserNotFound(false);
        } catch (error) {
          if (isAxiosError(error)) {
            if (error.status === 404) {
              setUserDetails(null);
              setUserNotFound(true);
            }
          }
        }
      };
      fetchUser();
    } else {
      setUserDetails(null);
      setUserNotFound(false);
    }
  }, 500);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    handleSearchUser(event.target.value);
  };
  const handleRoleChange = (event) => setRole(event.target.value);

  function CheckExistingUser(userId) {
    if (assignments.length == 0) {
      return;
    }
    return assignments.some((user) => user.user_id === userId);
  }

  const handleAddUser = async (event) => {
    event.preventDefault();

    const result = CheckExistingUser(userId);
    if (result) {
      toast.error("The user already Exist!");
      return;
    }

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

  // console.log("assignments");
  // console.log(assignments);

  if (loading) {
    return <p>Loading ...</p>;
  }

  // if (!userRole) {
  //   return <ErrorHandler error={"Access Denied"} />;
  // }

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
      {/* Pass the reloadAssignments state to UserAssignmentsDisplay to trigger re-fetch */}
      <UserAssignmentsDisplay
        currentUserData={currentUserData}
        projectId={projectId}
        userRole={userRole}
        reloadAssignments={reloadAssignments}
        setReloadAssignments={setReloadAssignments}
      />
    </div>
  );
};

export default AddUserRoles;
