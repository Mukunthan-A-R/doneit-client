import React, { useState, useEffect } from "react";
import { deleteAssignmentById } from "../services/collaboratorUserData";
import { fetchUserById } from "../services/UserData";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { createActivityLog } from "../services/projectActivity";

const UserAssignmentsDisplay = ({
  assignments,
  reloadAssignments,
  setReloadAssignments,
  userRole,
  currentUserData,
  owner,
}) => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { projectId: projectIdParam } = useParams();
  const projectId = parseInt(projectIdParam);

  // Fetch and store user details for each assignment
  useEffect(() => {
    const fetchUserDetails = async (assignmentsData) => {
      const userPromises = assignmentsData.map(async (assignment) => {
        if (!users[assignment.user_id]) {
          try {
            const userData = await fetchUserById(assignment.user_id);
            setUsers((prevUsers) => ({
              ...prevUsers,
              [assignment.user_id]: userData.data,
            }));
            setLoading(false);
          } catch (err) {
            console.error("Error fetching user data:", err);
            setError(err.message);
          }
        }
      });

      await Promise.all(userPromises);
    };

    fetchUserDetails(assignments || []);
  }, [assignments, projectId, reloadAssignments]);

  // Handle delete operation for assignment
  const handleDelete = async (assignmentId, userToDelete) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteAssignmentById(assignmentId);

      if (response.success) {
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

        setReloadAssignments(!reloadAssignments);
      } else {
        alert(response.message || "Failed to delete assignment.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
      alert("An error occurred while deleting.");
    }
  };

  // Helper: Render assignment row
  const renderAssignmentRow = (assignment) => {
    const user = users[assignment.user_id];

    return (
      <tr key={assignment.assignment_id} className="border-b">
        <td className="px-4 py-4">{user ? user.name : "Loading..."}</td>
        <td className="px-4 py-4">{assignment.role}</td>
        <td className="px-4 py-4">{user ? user.company : "Loading..."}</td>
        <td className="px-4 py-4 max-w-[170px] truncate" title={user?.email}>
          {user ? user.email : "Loading..."}
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
  };

  // UI rendering
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Project Owner Table */}
      {owner && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center my-4">
            Project Owner
          </h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700">User</th>
                  <th className="px-4 py-3 text-left text-gray-700">Role</th>
                  <th className="px-4 py-3 text-left text-gray-700">Company</th>
                  <th className="px-4 py-3 text-left text-gray-700">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-4">{owner.name}</td>
                  <td className="px-4 py-4">{"Super Admin"}</td>
                  <td className="px-4 py-4">{owner.company}</td>
                  <td
                    className="px-4 py-4 max-w-[170px] truncate"
                    title={owner.email}
                  >
                    {owner.email}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-center mb-4">
        User Assignments
      </h2>

      {/* Assignment Table */}
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
                <th className="px-4 py-3 text-left text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-gray-700">
                  Assigned At
                </th>
                {!["member", "client"].includes(userRole) && (
                  <th className="px-4 py-3 text-left text-gray-700">Delete</th>
                )}
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => renderAssignmentRow(assignment))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserAssignmentsDisplay;
