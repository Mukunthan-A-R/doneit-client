import axios from "axios";

// Define the API URL (email will be dynamic in the path)
const API_URL = "https://task-manager-server-ugiw.onrender.com/api/userEmail";

// Function to fetch user by email
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/${email}`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch user by email:",
      error.response?.data || error.message
    );
    throw error;
  }
};
