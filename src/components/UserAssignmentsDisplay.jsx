import React, { useState, useEffect } from "react";
import {
  deleteAssignmentById,
  getAssignmentsByProjectId,
} from "../services/collaboratorUserData";
import { fetchUserById } from "../services/UserData";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { createActivityLog } from "../services/projectActivity";

const UserAssignmentsDisplay = ({
  reloadAssignments,
  setReloadAssignments,
  userRole,
  currentUserData,
}) => {
  const [assignments, setAssignments] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const projectId = parseInt(params.projectId);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await getAssignmentsByProjectId(projectId);
        const ResData = response.data;

        if (response.status === 404) {
          setAssignments([]);
          setLoading(false);
          return;
        }

        if (response.success) {
          setAssignments(ResData || []);
          fetchUserDetails(ResData || []);
        } else {
          setError(response.message || "Failed to load assignments");
        }
      } catch (err) {
        console.log("🚀 ~ fetchAssignments ~ err:", err);
        setError("Error fetching assignments for users");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async (assignmentsData) => {
      const userPromises = assignmentsData.map(async (assignment) => {
        if (!users[assignment.user_id]) {
          try {
            const userData = await fetchUserById(assignment.user_id);
            setUsers((prevUsers) => ({
              ...prevUsers,
              [assignment.user_id]: userData.data,
            }));
          } catch (err) {
            console.error("Error fetching user data:", err);
          }
        }
      });

      await Promise.all(userPromises);
    };

    fetchAssignments();
  }, [projectId, reloadAssignments]); // Re-run when projectId or reloadAssignments changes

  const handleDelete = async (assignmentId, userToDelete) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteAssignmentById(assignmentId);

      if (response.success) {
        // Create activity log with the user info of the deleted assignment
        await createActivityLog({
          user_id: currentUserData.user_id,
          project_id: projectId,
          action: "remove-user",
          context: {
            targetUserId: userToDelete.id || userToDelete.user_id,
            targetUserName: userToDelete.name,
            targetUserEmail: userToDelete.email,
          },
        });

        // Refresh the assignments list after deletion
        setReloadAssignments(!reloadAssignments);
      } else {
        alert(response.message || "Failed to delete assignment.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        User Assignments
      </h2>

      {loading && (
        <p className="text-center text-gray-500">Loading assignments...</p>
      )}
      {error && !loading && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && assignments.length === 0 && (
        <p className="text-center text-gray-500">
          No assignments found for this project.
        </p>
      )}

      {!loading && !error && assignments.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700">User</th>
                <th className="px-4 py-3 text-left text-gray-700">Role</th>
                <th className="px-4 py-3 text-left text-gray-700">Company</th>
                <th className="px-4 py-3 text-left text-gray-700">
                  Assigned At
                </th>
                {!["member", "client"].includes(userRole) && (
                  <th className="px-4 py-3 text-left text-gray-700">Delete</th>
                )}
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => {
                const user = users[assignment.user_id];
                return (
                  <tr key={assignment.assignment_id} className="border-b">
                    <td className="px-4 py-4">
                      {user ? user.name : "Loading..."}
                    </td>
                    <td className="px-4 py-4">{assignment.role}</td>
                    <td className="px-4 py-4">
                      {user ? user.company : "Loading..."}
                    </td>
                    <td className="px-4 py-4">
                      {new Date(assignment.assigned_at).toLocaleDateString()}
                    </td>
                    {!["member", "client"].includes(userRole) && (
                      <td>
                        <div className="flex items-center justify-center h-full py-4">
                          <MdDelete
                            onClick={() =>
                              handleDelete(
                                parseInt(assignment.assignment_id),
                                users[assignment.user_id]
                              )
                            }
                            color="red"
                            size={20}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserAssignmentsDisplay;
