import axios from "axios";

const ApiUrl = import.meta.env.VITE_DONE_IT_API_URL;

if (!ApiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

// Base URL for the API
const apiUrl = `${ApiUrl}/api/collab`;

// 1. Get all assignments by project_id
export const getAssignmentsByProjectId = async (projectId) => {
  try {
    // Make GET request to fetch assignments by project_id
    const response = await axios.get(`${apiUrl}/${projectId}`, {
      params: { project_id: projectId }, // Sending project_id as a query param
    });

    // Return the response data if successful
    return response.data;
  } catch (error) {
    // console.error("Error fetching assignments by project ID:", error);
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};

// 2. Create an assignment (POST request)
export const createAssignment = async (assignmentData) => {
  try {
    // Make POST request to create a new assignment
    const response = await axios.post(apiUrl, assignmentData);

    // Return the response data if successful
    return response.data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

// 3. Delete an assignment by ID (DELETE request)
export const deleteAssignmentById = async (assignmentId) => {
  try {
    const response = await axios.delete(`${apiUrl}/${assignmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting assignment:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
