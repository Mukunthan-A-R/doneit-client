import React, { useState, useEffect } from "react";
import { getAssignmentsByProjectId } from "../services/collaboratorUserData"; // assuming you have this function
import { fetchUserById } from "../services/UserData"; // assuming you have the fetchUserById function

const UserAssignmentsDisplay = ({ projectId, userId }) => {
  const [assignments, setAssignments] = useState([]);
  const [users, setUsers] = useState({}); // To store user data by userId
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch assignments when the component mounts
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true); // Start loading
        const response = await getAssignmentsByProjectId(projectId);

        if (response.success) {
          setAssignments(response.data || []);
          fetchUserDetails(response.data || []); // Fetch user details for each assignment
        } else {
          setError(response.message || "Failed to load assignments");
        }
      } catch (err) {
        setError("Error fetching assignments");
      } finally {
        setLoading(false); // End loading
      }
    };

    // Function to fetch user details for each assignment
    const fetchUserDetails = async (assignmentsData) => {
      const userPromises = assignmentsData.map(async (assignment) => {
        try {
          const userData = await fetchUserById(assignment.user_id);
          setUsers((prevUsers) => ({
            ...prevUsers,
            [assignment.user_id]: userData.data, // Storing user data by user_id
          }));
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      });

      // Wait for all user fetch requests to complete
      await Promise.all(userPromises);
    };

    fetchAssignments();
  }, [projectId, userId]); // Re-run the effect when projectId changes

  // Render the component
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        User Assignments
      </h2>

      {loading && (
        <div className="text-center text-gray-500">
          <p>Loading assignments...</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && assignments.length === 0 && (
        <div className="text-center text-gray-500">
          <p>No assignments found for this project.</p>
        </div>
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
                const user = users[assignment.user_id]; // Get user data for this assignment
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
