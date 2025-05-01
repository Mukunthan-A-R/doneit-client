import axios from "axios";

// Base URL for collaboration projects API
const API_URL = "http://localhost:3000/api/collab-projects";

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
