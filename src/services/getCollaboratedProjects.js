import axios from "axios";

const apiUrl = import.meta.env.VITE_DONE_IT_API_URL;

if (!apiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

// Base URL for collaboration projects API
const API_URL = `${apiUrl}/api/collab-projects`;

// Function to fetch all projects a user is collaborating on
export const getCollaboratedProjects = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch collaborated projects:",
      error.response?.data || error.message
    );
    throw error;
  }
};
