import React, { useState, useEffect } from "react";
import { getAssignmentsByProjectId } from "../services/collaboratorUserData";
import { fetchUserById } from "../services/UserData";

const UserAssignmentsDisplay = ({ projectId, reloadAssignments }) => {
  const [assignments, setAssignments] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await getAssignmentsByProjectId(projectId);

        if (response.success) {
          setAssignments(response.data || []);
          fetchUserDetails(response.data || []);
        } else {
          setError(response.message || "Failed to load assignments");
        }
      } catch (err) {
        setError("Error fetching assignments");
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
  }, [projectId, reloadAssignments]); // Re-run the effect when projectId or reloadAssignments changes

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
                <th className="px-6 py-3 text-left text-gray-700">User</th>
                <th className="px-6 py-3 text-left text-gray-700">Role</th>
                <th className="px-6 py-3 text-left text-gray-700">Company</th>
                <th className="px-6 py-3 text-left text-gray-700">
                  Assigned At
                </th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => {
                const user = users[assignment.user_id];
                return (
                  <tr key={assignment.assignment_id} className="border-b">
                    <td className="px-6 py-4">
                      {user ? user.name : "Loading..."}
                    </td>
                    <td className="px-6 py-4">{assignment.role}</td>
                    <td className="px-6 py-4">
                      {user ? user.company : "Loading..."}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(assignment.assigned_at).toLocaleDateString()}
                    </td>
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
